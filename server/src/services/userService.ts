import { log } from "console";
import { tokensDB, userPrefferences, users } from "./db";
import { UserAndPrefferncesType, UserType } from "../../../types/userType";
import { UserAndPrefferencesDto } from "../../../dto/userDto";
import bcrypt from "bcrypt";
import { generateTokens } from "./tokenservice";
const saltRounds = 10;
export class UserService {
  static async register({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    if (password.length < 6) {
      return "password length must be 6 or greater";
    }
    const candidate = users.find((user) => user.email === email);
    if (!candidate) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          return "bcrypt error";
        }
        saveUser(hash);
      });
      function saveUser(hash: string) {
        users.push({
          _id: Math.random().toString(),
          name: name,
          surname: "",
          password: hash,
          image: "",
          email: email,
        });
      }

      return "Sucessfully registered";
    } else {
      return "This Email Already  registered";
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
        _id: string;
        acessToken: string;
        refreshToken: string;
      }
    | undefined
  > {
   // console.log(email);
    
    const user = users.find((user) => user.email === email.trim());
    if (!user) {
      console.log("You don t registered to Login");
      return;
    }


    return new Promise((resolve, rej) => {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
       console.log("compare error");
       
        } 
        if(!result){  rej("Email or Password incorrect");}
        
        else {
          console.log(password);
          
          const res = generateTokens({ _id: user._id, name: user.name });

          {
            const refreshToken = tokensDB.find((t) => t._id === user._id);
            if (refreshToken) {
              refreshToken.refreshToken = res.refreshToken;
            } else {
              tokensDB.push({ _id: user._id, refreshToken: res.refreshToken });
            }
          }
          resolve({
            _id: user._id,
            acessToken: res.acessToken,
            refreshToken: res.refreshToken,
          });
        }
      });
    });
  }
  static userPrefferences(userId: string) {
    return userPrefferences.find((e) => e.userId === userId);
  }

  static async getUsers(userIds: string[]) {
    const res: UserType[] = [];
    for await (const id of userIds) {
      const candidate = await this.getSingleUser(id);
      if (candidate) {
        res.push(candidate);
      }
    }

    return res;
  }
  static async getSingleUser(userId: string) {
    return users.find((user) => user._id == userId);
  }
  static async getUserData(userId: string) {
    const user = (await this.getSingleUser(userId)) as any;
    if (user) {
      const prefferences = this.userPrefferences(user?._id);
      return { user: user, prefferences: prefferences };
    }
  }

  static findPersonsByNameAndSurname(searchCase: string) {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchCase.toLowerCase()) ||
        user.surname?.toLowerCase().includes(searchCase.toLowerCase())
    );
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
    console.log(myId);

    if (iAmUser) {
      const userConfig = userPrefferences.find(
        (config) => config.userId === myId
      );
      const unfollowMeFromConfig = userPrefferences.find(
        (config) => config.userId === candidateId
      );
      if (userConfig && unfollowMeFromConfig) {
        userConfig.followings = userConfig.followings.filter(
          (id) => id !== candidateId
        );
        unfollowMeFromConfig.followers = unfollowMeFromConfig.followers.filter(
          (id) => id !== myId
        );

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
      const userConfig = userPrefferences.find(
        (config) => config.userId === iAmUser._id
      );
      const unfollowFromMeConfig = userPrefferences.find(
        (config) => config.userId === candidateId
      );
      if (userConfig && candidate) {
        userConfig.followings = userConfig.followings.filter(
          (id) => id !== candidateId
        );
        userConfig.followers = userConfig.followers.filter(
          (id) => id !== candidateId
        );
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
      const userConfig = userPrefferences.find(
        (config) => config.userId === iAmUser._id
      );
      const subscribeToConfig = userPrefferences.find(
        (config) => config.userId === subscribeTo._id
      );
      if (userConfig) {
        if (userConfig.followings.includes(candidateId))
          throw new Error("Yoy alredy subscribed");
        userConfig.followings.push(candidateId);
        subscribeToConfig?.followers.push(myId);

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
    return user;
  }
}
