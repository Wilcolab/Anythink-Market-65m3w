var mongoose = require("mongoose");
require("./models/User");
require("./models/Item");
require("./models/Comment");
require("./config/passport");
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
var Item = mongoose.model("Item");
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");

var addItems = async () => {
    for (var i = 0; i<100; i++) {
        let rand = Math.ceil(Math.random() * 100000);
        let user = new User({
            username: rand,
            email: `${rand}@${rand}.com`
        });
        let item = new Item({
            title: `random ${rand}`,
            description: `random ${rand}`,
            image: `https://picsum.photos/id/${rand}/200/300`,
            tagList: '',
        });
        let comment = new Comment({
            body: rand
        })

        let savedUser = await user.save();
        item.seller = savedUser;
        let savedItem = await item.save();
        


        comment.seller = savedUser;
        comment.item = savedItem;
    
        
    
        await comment.save();
    }

}

addItems().then(process.exit);