import UserModel from "../../User/model";

export const linkEmailController = async (req, res) => {
  const { email, wallet } = req.body;
  
  try {
    let existingUser= await UserModel.findOne({wallet});
    existingUser.email=email;
    await existingUser.save();
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
