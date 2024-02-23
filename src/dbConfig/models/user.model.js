import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

userSchema.pre("save", async function(next){
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
