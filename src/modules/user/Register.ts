import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./Register/RegisterInput";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String, { nullable: false })
  async Hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg("data")
    { password, lastName, firstName, username, email }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create<User>({
      lastName,
      firstName,
      username,
      email,
      password: hashedPassword,
    }).save();
    return user;
  }
}
