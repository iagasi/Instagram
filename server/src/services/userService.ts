import { log } from "console";
import { UserAndPrefferncesType, UserType } from "../../../types/userType";
import { UserAndPrefferencesDto } from "../../../dto/userDto";
import bcrypt from "bcrypt";
import { generateTokens } from "./tokenservice";
import { UserDb } from "../db/schemas/User";
import { TokenDb } from "../db/schemas/TokenDb";
import { PrefferenceDb } from "../db/schemas/Prefferences";
import { ObjectId } from "mongodb";
const saltRounds = 10;
export class UserService {
  static async register({
    email,
    name,
    password,
    surname,
  }: {
    email: string;
    name: string;
    password: string;
    surname: string;
  }) {
    try {
      if (password.length < 6) {
        return "password length must be 6 or greater";
      }
      const candidate = await UserDb.findOne({ email: email });

      if (!candidate) {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (err) {
            return "bcrypt error";
          }
          const doc = new UserDb({
            email: email,
            password: hash,
            name: name,
            surname: surname,
          });
          await doc.save();
          doc._id;
          const prefferenceDoc = new PrefferenceDb();
          prefferenceDoc.userId = doc._id;
          await prefferenceDoc.save();
        });

        return "Sucessfully registered";
      } else {
        return "This Email Already  registered";
      }
    } catch (e) {
      console.log("Registracion error");
    }
  }
  static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<
    | {
        userId: string;
        acessToken: string;
        refreshToken: string;
      }
    | undefined
  > {
    // console.log(email);
    const user = await UserDb.findOne({ email: email.trim() });

    if (!user) {
      throw  new Error("Email or Password incorrect");
    
    }

    return new Promise((resolve, rej) => {
      bcrypt.compare(password, user.password, async function (err, result) {
        if (err) {
          console.log("compare error");
        }
        if (!result) {
          rej(new Error("Email or Password incorrect"));
        } else {

          const res = generateTokens({ _id: user._id, name: user.name });

          {
            const refreshToken = await TokenDb.findOne({ userId: user._id });
            if (refreshToken) {
              refreshToken.refreshToken = res.refreshToken;
             await refreshToken.save()
            } else {
              const newToken = new TokenDb({
                userId: user._id,
                refreshToken: res.refreshToken,
              });
              await newToken.save();
            }
          }
          resolve({
            userId: user._id.toString(),
            acessToken: res.acessToken,
            refreshToken: res.refreshToken,
          });
        }
      });
    });
  }
  static async userPrefferences(userId: string) {
    return await PrefferenceDb.findOne({ userId: new ObjectId(userId)});
  }

  static async getUsers(userIds: string[]) {
    const res = [];
    for await (const id of userIds) {
      const candidate = await this.getSingleUser(id);
      if (candidate) {
        res.push( candidate );
      }
    }

    return res;
  }
  static async getSingleUser(userId: string) {
    return await UserDb.findById(userId);
  }
  static async getUserData(userId: string) {
    const user = (await this.getSingleUser(userId)) as any;

    if (user) {
      const prefferences = this.userPrefferences(user?._id);
      return { user: user, prefferences: prefferences };
    }
  }

  static async findPersonsByNameAndSurname(searchCase: string) {
    const regex = new RegExp(searchCase, "i");

    const persons = await UserDb.find({
      $or: [{ name: { $regex: regex } }, { surname: { $regex: regex } }],
    });

    return persons;
  }

  static async getUserFriends(id: string) {
    const user = await this.userPrefferences(id);
    const res: any = {
      followers: [],
      followings: [],
    };
    if (user) {
      const followers = await this.getUsers(user?.followers);
      const followings = await this.getUsers(user?.followings);
      res.followers = followers;
      res.followings = followings;

    }

    return res;
    
  }

  static async deleteFollowing(
    myId: string,
    candidateId: string
  ): Promise<UserAndPrefferncesType | null> {
    console.log("here");

    const iAmUser = await this.getSingleUser(myId);

    if (iAmUser) {
      const userConfig = await PrefferenceDb.findOne({ userId: myId });

      const unfollowMeFromConfig = await PrefferenceDb.findOne({
        userId: candidateId,
      });

      if (userConfig && unfollowMeFromConfig) {
        userConfig.followings = userConfig.followings.filter(
          (id) => id !== candidateId
        );
        unfollowMeFromConfig.followers = unfollowMeFromConfig.followers.filter(
          (id) => id !== myId
        );
await userConfig.save()
await unfollowMeFromConfig.save()
        return new UserAndPrefferencesDto(iAmUser, userConfig);
      }
    }
    return null;
  }

  static async deleteFollower(
    myId: string,
    candidateId: string
  ): Promise<UserAndPrefferncesType | null> {
    const iAmUser = await this.getSingleUser(myId);
    const candidate = await this.getSingleUser(candidateId);
    console.log("Here myst not be");

    if (iAmUser) {
      await PrefferenceDb.findOne({ userId: iAmUser._id });
      const userConfig = await PrefferenceDb.findOneAndUpdate({
        userId: iAmUser._id,
      });

      const unfollowFromMeConfig = await PrefferenceDb.findOne({
        userId: candidateId,
      });

      if (userConfig && candidate) {
        userConfig.followings = userConfig.followings.filter(
          (id) => id !== candidateId
        );
        userConfig.followers = userConfig.followers.filter(
          (id) => id !== candidateId
        );
        await userConfig.save()
        await unfollowFromMeConfig?.save()
        return new UserAndPrefferencesDto(iAmUser, userConfig);
      }
    }
    return null;
  }
  static async subscribe(
    myId: string,
    candidateId: string
  ): Promise<UserAndPrefferncesType | null> {
    const iAmUser = await this.getSingleUser(myId);
    const subscribeTo = await this.getSingleUser(candidateId);
    console.log("subscribe");

    if (iAmUser && subscribeTo) {
      const userConfig = await PrefferenceDb.findOne({ userId: iAmUser._id });
      const subscribeToConfig = await PrefferenceDb.findOne({
        userId: subscribeTo._id,
      });


      if (userConfig&&iAmUser) {
          if (userConfig.followings.includes(candidateId))
            throw new Error("Yoy alredy subscribed");
          userConfig.followings.push(candidateId);
          subscribeToConfig?.followers.push(myId);
          await userConfig.save()
          await subscribeToConfig?.save()
          return new UserAndPrefferencesDto(iAmUser, userConfig);
      }
    }

    return null;
  }

  static async changeNameSurname(myId: string, name: string, surname: string) {
    const user = await this.getSingleUser(myId);
    if (!user) return;

    if (name) user.name = name;
    if (surname) user.surname = surname;
    await user.save()
    return user;
  }
}
