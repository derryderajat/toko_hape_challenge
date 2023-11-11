const { PrismaClient, Prisma } = require(`@prisma/client`);
const ResponseTemplate = require("../helper/template");
const prisma = new PrismaClient();
const profile = async (req, res) => {
  console.log(req.user);
  res.json({ success: "ok" });
};
const modify_photo_profile = async (req, res) => {
  const { email } = req.user;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;

  const updatedUser = await prisma.users.update({
    where: { email: email },
    data: {
      profile_picture: imageUrl,
    },
    select: {
      id: true,
      email: true,
      profile_picture: true,
    },
  });
  res
    .status(201)
    .json(ResponseTemplate(updatedUser, "Profile Picture Updated", null, true));
  return;
};

module.exports = {
  profile,
  modify_photo_profile,
};
