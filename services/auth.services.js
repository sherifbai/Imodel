const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const speakeasy = require('speakeasy')


const {
  hash,
  compare
} = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const {phone,password} = req.body;
    const userWithSamePhone = await User.findOne({
      phone: phone,
    });
    //Добавить в проверку еще поиск по моделе модели
    //Если регистируется модель то у нее есть реферальный код. По этому коду нужно найти пользователя, и присвоить его айди моделе в таблице, invitedBy:айди найденого юзера
    
    if (userWithSamePhone)
      return res
        .status(409)
        .json({
          message: "User with this email already exists"
        });
    const hashedPassword = await hash(password, 12);
    password = hashedPassword;
    const newUser = new User({
      phone,
      password,
      code:'1111'
      //добавить в сохранение генирацию кода пригласившего, код УНИКАЛЬНый, введя этот код другие пользователи станут рефералом данного человека, а у него в моделе countReferals увеличется на 1
      //код для подтвержения телефона , переделать на случайный
    });
    await newUser.save();
    res.json({
      message: "User created!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      phone,
      password
    } = req.body;

    let user = await User.findOne({
      phone,
    }).select("+password");
    //Добавить авторизацию модели
    
  
    if (!user)
      return res
        .status(422)
        .json({
          message: "User with this email does not exist"
        });

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect)
      return res
        .status(422)
        .json({
          message: "User with this email or password does not exist"
        });
    user.password = undefined;

    //Добавить проверку на подтверженный телефон, если он не подтвежден возвращать res.json({status:"Телефон не подтвержден",userId:user._id})
    const jwtToken = jwt.sign({
      user
    }, process.env.JWT_SECRET);
    res.json({
      jwtToken,
      user
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "Internal Server Error"
    });
  }
};

exports.proof_register=async(req,res)=>{
//Роут на который юзер отправляет свой айди , ты делаешь поиск в бд по этому айди и если код что он отправил 2 параметром такой же как и код в бд делаешь ему поле в модели isPhoneProof: true и пускаешь пользоваться приложением
//То же самое делаешь и для модели
let {userId,code} = req.body
}