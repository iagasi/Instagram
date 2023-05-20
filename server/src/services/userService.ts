import { log } from "console";
import { userPrefferences, users } from "./db";
import { UserAndPrefferncesType, UserType } from "../../../types/userType";
import { UserAndPrefferencesDto } from "../../../dto/userDto";
export class UserService {
  constructor() {}
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
        user.surname.toLowerCase().includes(searchCase.toLowerCase())
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

  static async deleteFollower(
    myId: string,
    candidateId: string,
  
  ): Promise<UserAndPrefferncesType | null> {
    const iAmUser = await this.getSingleUser(myId);
    if (iAmUser) {
      const userConfig = userPrefferences.find(
        (config) => config.userId === iAmUser._id
      );
     
      if (userConfig) {
        userConfig.followers = userConfig.followers.filter(
          (id) => id !== candidateId
        );
console.log(candidateId);

        console.log(userConfig.followers );
        return new UserAndPrefferencesDto(iAmUser, userConfig);
        
        
      }
    }
    return null;
  }

  static async deleteFollowing(
    myId: string,
    candidateId: string,
  
  ): Promise<UserAndPrefferncesType | null> {
    const iAmUser = await this.getSingleUser(myId);
    if (iAmUser) {
      const userConfig = userPrefferences.find(
        (config) => config.userId === iAmUser._id
      );
     
      if (userConfig) {
        userConfig.followings = userConfig.followings.filter(
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
    console.log(myId);
    console.log("subscribe");
    
    if (iAmUser) {
      const userConfig = userPrefferences.find(
        (config) => config.userId === iAmUser._id
      );
      if (userConfig) {
        if (userConfig.followings.includes(candidateId))
          throw new Error("Yoy alredy subscribed");
        userConfig.followings.push(candidateId);
        return new UserAndPrefferencesDto(iAmUser, userConfig);
      }
    }
    return null;
  }
}
