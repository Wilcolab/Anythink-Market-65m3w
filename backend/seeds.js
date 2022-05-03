var mongoose = require("mongoose");
require("./models/User");
require("./models/Item");
require("./models/Comment");
require("./config/passport");
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
var Item = mongoose.model("Item");
var User = mongoose.model("User");

var addItems = async () => {
    const id = "000000000000000000000000";
    const user = await User.findById(id);
    for (var i = 0; i<200; i++) {
        let item = new Item({
            title: `random ${Math.ceil(Math.random() * 1000)}`,
            description: `random ${Math.ceil(Math.random() * 1000)}`,
            image: `https://picsum.photos/id/${Math.ceil(Math.random() * 1000)}/200/300`,
            tagList: '',
          });
    
        item.seller = user;
    
        await item.save();
    }

}

addItems().then(process.exit);