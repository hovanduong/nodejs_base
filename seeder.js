// const seeder = require('mongoose-seed');
const faker = require('faker');
const User = require('./src/models/userModel');
const Categories = require('./src/models/categoriesModel');
const Topic = require('./src/models/topicModel');
const Comment = require('./src/models/commentModel');
for (let i = 0; i < 2; i++) {
    const user = new User({    
    name : faker.name.findName(),
    email : faker.internet.email(),
    password : faker.internet.password(),

    })
    user.save().then(userRef => {

        console.log(`${userRef.name} saved successfully`);
       
        const categories=new Categories({
            name:faker.name.findName(),
            description:faker.lorem.text(),
        })
        
        categories.save().then(categoriesRef=>{

            const topic = new Topic({
                categoryId:categories._id,
                userId:user._id,
                content:faker.name.firstName(),
            })

            topic.save().then(topicRef=>{
                const comment = new Comment({
                    topicId:topic._id,
                    userId: user._id,
                    content:faker.name.firstName(),
                })
                comment.save();
            })
        })
    
        
    });
}