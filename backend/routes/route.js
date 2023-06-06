const express= require('express');
const Admin = require('../models/admin');
const Banner = require('../models/banner');
const NotificationModel = require('../models/notifications');
const LoanOfferModel = require('../models/loanoffers');
const Setting = require('../models/settings');
const Users = require('../models/users');
const bcrypt= require('bcrypt');
const {LocalStorage}= require('node-localstorage');
const jwt = require('jsonwebtoken');
const {authMiddleware}= require('../middleware/middleware');
const fs = require('fs');
const path = require('path');
const multer = require('multer');



const router = express.Router();
const localStorage = new LocalStorage('./scratch');


//for sign up
// router.post('/register', async (req, res) => {
//   try {
//       console.log('check the register api - ', req.body)
//     const existingUser = await Model.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).send({ message: 'Email already registered' });
//     }
//     const register = new Model({ ...req.body, role: req.body.userType });
//     await register.save();

//     res.status(201).send(register);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/upload-banner', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const obj = {
      title: req.body.title,
      url: req.body.url,
      image: {
        data: fs.readFileSync(path.join(__dirname, '../uploads', req.file.filename)),
        contentType: req.file.mimetype,
      },
    };

    Banner.create(obj)
      .then(() => {
        res.status(201).json({ message: 'Banner created successfully' });
        // res.redirect('/get-banner');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } catch (err) {
    console.error(err);
    res.status(400).send('Bad Request');
  }
});



router.get('/get-banner', (req, res) => {
  Banner.find({})
    .then((banners) => {
      const mappedBanners = banners.map((banner) => {
        const base64Image = banner.image.data.toString('base64');
        return {
          _id: banner._id,
          title: banner.title,
          url: banner.url,
          image: {
            contentType: banner.image.contentType,
            data: base64Image,
          },
        };
      });

      res.status(200).json(mappedBanners);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});





router.post('/admin-register', async (req, res) => {
  try {
      console.log('check the register api - ', req.body)
    const existingUser = await Model.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already registered' });
    }
    const register = new Model({ ...req.body, role: req.body.userType });
    await register.save();

    res.status(201).send(register);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post('/login', async (req, res) => {
  const { email, password} = req.body;

  try {
    let user;
    if (email) {
      user = await Admin.findOne({ email });
    }
    
     else 

      return res.status(400).json({ message: 'Email is required' });
    

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    const mypass= user.password
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' ,mypass});
    }

    const token = jwt.sign({ userId: user._id }, 'abcd');
    localStorage.setItem('myToken', token);
    res.token = token;

    const storedToken = localStorage.getItem('myToken');
    const decodedToken = jwt.decode(token);

    return res.json({ message: 'Successfully logged in', token, decodedToken, storedToken, user});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});





router.get('/get-notification', (req, res) => {
  NotificationModel.find({})
    .then((banners) => {
      const mappedBanners = banners.map((banner) => {
        let base64Image = '';
        if (banner.image && banner.image.data) {
          base64Image = banner.image.data.toString('base64');
        }
        return {
          _id: banner._id,
          title: banner.title,
          content: banner.content,
          status: banner.status,
          date: banner.date,
          image: {
            contentType: banner.image ? banner.image.contentType : '',
            data: base64Image,
          },
        };
      });

      res.status(200).json(mappedBanners);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});



router.post('/upload-notification', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
  const obj = {
    title: req.body.title,
    content:req.body.content,
    status: req.body.status,
    date: req.body.date,
    image: {
      data: fs.readFileSync(path.join(__dirname, '../uploads', req.file.filename)),
      contentType: req.file.mimetype,
    },

  };
  NotificationModel.create(obj)
    .then(() => {
      res.status(201).json({ message: 'Banner created successfully' });
    
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
  } catch (err) {
    console.error(err);
    res.status(400).send('Bad Request');
  }
});


  
  

  router.get('/loan-offers-info', authMiddleware, async (req, res) => {
    try {
  
      const data = await LoanOfferModel.find();
      res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  router.post('/add-loan-offer', async (req, res) => {
    try {
  
      const register = new LoanOfferModel(req.body);
      await register.save();
      console.log("sucessfully added")
      return res.status(201).send(register);
  
    } catch (error) {
      return res.status(400).send(error);
    }
  });
  
router.post('/update-loanoffer/:id', authMiddleware, async (req, res) => {
  try {
    const loanId = req.params.id;
    const loan = await LoanOfferModel.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: 'loan offer not found' });
    }
    loan.amount = req.body.amount || loan.amount;
    loan.period = req.body.period || loan.period;
    loan.interest = req.body.interest || loan.interest;
    
    await loan.save();

    res.json({ message: 'loan offers updated', loan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
  router.delete('/delete-loanoffer/:id', authMiddleware, async (req, res) => {
    try {
  
      const loan = await LoanOfferModel.findOneAndDelete({ _id: req.params.id });
  
      if (!loan) {
        return res.status(404).json({ message: 'loan offer not found or unauthorized to delete.' });
      }
      res.json({ message: 'loan offer deleted!', loan });
  
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
  router.post('/new-admin', async (req, res) => {
   
    try {
      const existingUser = await Admin.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already registered' });
      }
      const register = new Admin(req.body);
      await register.save();
      res.status(201).send(register);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  router.get('/admin-info', authMiddleware, async (req, res) => {
    try {
      const data = await Admin.find(); 
      res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  
 
  router.delete('/delete-admin/:id', authMiddleware, async (req, res) => {
    try {
  
      const user = await Admin.findOneAndDelete({ _id: req.params.id });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found or unauthorized to delete.' });
      }
      res.json({ message: 'User deleted!', user });
  
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
  router.post('/update-admin-info/:id', authMiddleware, async (req, res) => {
  try {
    console.log("my request body",req.body)
    const userId = req.params.id;
    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    user.name = req.body.name || user.name;
    user.password = req.body.password || user.password;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.email = req.body.email || user.email;
    user.status = req.body.status || user.status;

    let actionsToCreate = [];
    actionsToCreate.push(req.body.actions.dashboard ? 'dashboard' : null);
    actionsToCreate.push(req.body.actions.createOffers ? 'createOffers' : null);
    actionsToCreate.push(req.body.actions.loanActivity ? 'loanActivity' : null);
    actionsToCreate.push(req.body.actions.popupBanners ? 'popupBanners' : null);
    actionsToCreate.push(req.body.actions.announcement ? 'announcement' : null);
    actionsToCreate.push(req.body.actions.manageAdmins ? 'manageAdmins' : null);
    actionsToCreate.push(req.body.actions.users ? 'users' : null);
    actionsToCreate = actionsToCreate.filter(val => val)

  
    user.actions = actionsToCreate;

    await user.save();


    res.json({ message: 'Admin info updated', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
});

  router.get('/admin-infoo/:id', async (req, res) => {
    try {
        const data = await Admin.findById(req.params.id);
        const { info, email, actions, name, status, phoneNumber } = data; 
        const modifiedData = { info, email, actions, name, status, phoneNumber };
        res.json(modifiedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/delete-banner/:id', authMiddleware, async (req, res) => {
  try {

    const banner = await Banner.findOneAndDelete({ _id: req.params.id });

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found or unauthorized to delete.' });
    }
    res.json({ message: 'banner deleted!', banner });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

router.delete('/delete-notification/:id', authMiddleware, async (req, res) => {
  try {

    const notification = await NotificationModel.findOneAndDelete({ _id: req.params.id });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found or unauthorized to delete.' });
    }
    res.json({ message: 'banner deleted!', notification });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
});
router.post('/upload-main-banner', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const obj = {
      image: {
        data: fs.readFileSync(path.join(__dirname, '../uploads', req.file.filename)),
        contentType: req.file.mimetype,
      },
    };


    Setting.findOneAndUpdate({}, obj)
      .then(() => {
        res.status(200).json({ message: 'Banner updated successfully' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } catch (err) {
    console.error(err);
    res.status(400).send('Bad Request');
  }
});



router.get('/get-main-banner', (req, res) => {
  Setting.find({})
    .then((banners) => {
      const mappedBanners = banners.map((banner) => {
        const base64Image = banner.image.data.toString('base64');
        return {
          _id: banner._id,
          image: {
            contentType: banner.image.contentType,
            data: base64Image,
          },
        };
      });

      res.status(200).json(mappedBanners);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

router.post('/add-new-user', async (req, res) => {
  
    const register = new Users(req.body);
    await register.save();
    res.status(201).send(register);
  }
);
router.get('/user-info', authMiddleware, async (req, res) => {
  try {
    const data = await Users.find(); 
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.delete('/delete-user/:id', authMiddleware, async (req, res) => {
  try {

    const user = await Users.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found or unauthorized to delete.' });
    }
    res.json({ message: 'User deleted!', user });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
});
  
 

router.post('/update-user-info/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'loan offer not found' });
    }
    user.name = req.body.name || user.name;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.nric = req.body.nric || user.nric;
    user.refferal = req.body.refferal || user.refferal;
    user.bankname = req.body.bankname || user.bankname;
    user.accountname = req.body.accountname || user.accountname;
    user.accountNumber = req.body.accountNumber || user.accountNumber;
  

    


    await user.save();

    res.json({ message: 'user info updated', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

  
router.post('/update-banner/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Banner.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    user.title = req.body.title || user.title;
    user.url = req.body.url || user.url;
    user.image = req.body.image || user.image;
    

    await user.save();
    res.json({ message: 'Banner updated', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
});
router.post('/update-notification/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await NotificationModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    user.title = req.body.title || user.title;
    user.content = req.body.content || user.content;
    user.status = req.body.status || user.status;
    user.date = req.body.date || user.date;
    user.image = req.body.image || user.image;

    await user.save();
    res.json({ message: 'Notification updated', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
});
  
  
  

  

  
  
  

  


  

  
  module.exports = router;