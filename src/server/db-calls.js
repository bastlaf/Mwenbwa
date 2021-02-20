//File for managing DB manipulation

// DATABASE CONNEXION
import {MongoClient, uri} from "./db-connexion";

//GET

//Get all trees
const dbGetTrees = () => {
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    async function run() {
        try {
          await client.connect();
          const database = client.db('mwenbwa');
          const collection = database.collection('trees');
          
          const query = {
              arbotag: { $ne: null },
              circonf: { $ne: null },
              hauteur_totale: { $ne: null }
          };
          const options = {
            // Include only the arbotags and geoloc in each returned document
            projection: { _id: 0, arbotag: 1, x_lambda: 1, y_phi: 1 },
          };
          const cursor = await collection.find(query, options);
          const result = await cursor.toArray();

          return result;

        } catch (err) {

            console.error(`Something went wrong: ${err}`);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
            
        }
    }
    //run().catch(console.dir);
    return run();
    
};

//Get a specific tree
const dbGetTree = (tree) => {

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    //console.log(tree);

    async function run() {
        try {
          await client.connect();
          const database = client.db('mwenbwa');
          const collection = database.collection('trees');
          
          const query = {
              arbotag: +tree
          };
          const options = {
            // Include only useful infos in each returned document
            projection: { _id: 0, arbotag: 1, x_lambda: 1, y_phi: 1, hauteur_totale: 1, nom_complet: 1, circonf: 1 },
          };
          const cursor = await collection.find(query, options);
          const result = await cursor.toArray();

          //console.log(result);
          return result;

         

        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }
      //run().catch(console.dir);
      return (run());

}

//Get a user
const dbGetUser = userId => {
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    async function run() {
        try {
          await client.connect();
          const database = client.db('mwenbwa');
          const collection = database.collection('playersTest');

          const cursor = await collection.find({ id: +userId });
          const result = await cursor.toArray();

          //console.log(result);
          return result;

            
        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    //run().catch(console.dir);
    return run();
};

//Get the leaderboard
const dbGetLeaderboard = () => {
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    async function run() {
        try {
            await client.connect();
            const database = client.db("mwenbwa");
            const collection = database.collection("playersTest");

            const query = {};
            const options = {
                // sort returned documents in descending order by score
                sort: {score: -1},
                // Include only the username, color and score fields in each returned document
                projection: {_id: 0, username: 1, color: 1, score: 1},
            };
            const cursor = await collection.find(query, options);
            const result = await cursor.toArray();

            //console.log(result);
            return result;

        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    //run().catch(console.dir);
    return run();
};

//Get the logs
const dbGetLogs = () => {
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    async function run() {
        try {
            await client.connect();
            const database = client.db("mwenbwa");
            const collection = database.collection("logs");

            const query = {};
            const options = {
                // sort returned documents in descending order by score
                sort: {_id: -1},
                // Include only the username, color and score fields in each returned document
                projection: {_id: 0, content: 1},
            };
            const cursor = await collection.find(query, options);
            const result = await cursor.toArray();

            //console.log(result);
            return result;

        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    //run().catch(console.dir);
    return run();
};

// POST

//Login
const dbLogin = userInfo => {
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    async function run() {
        try {
            await client.connect();
            const database = client.db("mwenbwa");
            const collection = database.collection("playersTest");

            const query = {username: userInfo};
            const options = {};
            const cursor = await collection.find(query, options);
            const result = await cursor.toArray();

            //console.log(result);
            return result;

        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    //run().catch(console.dir);
    return run();
};

//Register
const dbRegister = (userId, userPassword, userEmail, userColor) =>{

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    async function run() {
        try {
          await client.connect();
          const database = client.db('mwenbwa');
          const collection = database.collection('playersTest');
          const numberOfPlayer = collection.count();

          const newUser = {
            id: numberOfPlayer+1,
            username: userId,
            password: userPassword,
            email: userEmail,
            color: userColor,

          };

        
          const cursor = await collection.insertOne(newUser);
          const result = ("done");

          //console.log(result);
          return result;

         

        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }
      //run().catch(console.dir);
      return (run());
}



// GAME ACTIONS

//Buy tree
const dbBuyTree = (tree, userId) => {

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    
    async function run() {
        try {
          await client.connect();
          const database = client.db('mwenbwa');
          const collection = database.collection('trees');
          
          const filter = { arbotag: +tree }
          const options = { upsert: false };
          
          const updateDoc = {
              $set: {
                  owner: userId,
              },
          };

          const result = await collection.updateOne(filter, updateDoc, options);
          console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
          );

         

        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }
      //run().catch(console.dir);
      return (run());

};

//Lock a tree
const dbLockTree = tree => {

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    
    async function run() {
        try {
          await client.connect();
          const database = client.db('mwenbwa');
          const collection = database.collection('trees');
          
          const filter = { arbotag: +tree }
          const options = { upsert: false };
          
          const updateDoc = {
              $set: {
                  locked: true,
              },
          };

          const result = await collection.updateOne(filter, updateDoc, options);
          console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
          );

         

        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }
      //run().catch(console.dir);
      return (run());

};

//Add a comment
const dbAddComment = (tree, user, newComment) => {};

//CHANGE SETTINGS

//Change Color
const dbChangeColor = (userId, newColor) => {
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    async function run() {
        try {
            await client.connect();
            const database = client.db("mwenbwa");
            const collection = database.collection("playersTest");

            const filter = { username: userId }
            const options = { upsert: false };
            
            const updateDoc = {
                $set: {
                    color: newColor,
                },
            };

            const result = await collection.updateOne(filter, updateDoc, options);
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );
            
        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    //run().catch(console.dir);
    return run();
};

//Change Mail
const dbModifyMail = (userId, newMail) => {

    const client = new MongoClient(uri, {useUnifiedTopology: true});

    async function run() {
        try {
            await client.connect();
            const database = client.db("mwenbwa");
            const collection = database.collection("playersTest");

            const filter = { username: userId }
            const options = { upsert: false };
            
            const updateDoc = {
                $set: {
                    email: newMail,
                },
            };

            const result = await collection.updateOne(filter, updateDoc, options);
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );
            
        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    //run().catch(console.dir);
    return run();

};

//Change Username
const dbModifyUsername = (userId, newUsername) => {

    const client = new MongoClient(uri, {useUnifiedTopology: true});

    async function run() {
        try {
            await client.connect();
            const database = client.db("mwenbwa");
            const collection = database.collection("playersTest");

            const filter = { username: userId }
            const options = { upsert: false };
            
            const updateDoc = {
                $set: {
                    username: newUsername,
                },
            };

            const result = await collection.updateOne(filter, updateDoc, options);
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );
            
        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    //run().catch(console.dir);
    return run();

};

//Change Password
const dbModifyPassword = (userId, newPassword) => {
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    async function run() {
        try {
            await client.connect();
            const database = client.db("mwenbwa");
            const collection = database.collection("playersTest");

            const filter = { username: userId }
            const options = { upsert: false };
            
            const updateDoc = {
                $set: {
                    password: newPassword,
                },
            };

            const result = await collection.updateOne(filter, updateDoc, options);
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );
            
        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    //run().catch(console.dir);
    return run();
};

//Modify Profile Pics
const dbModifyPics = (userId, newPics) => {

    const client = new MongoClient(uri, {useUnifiedTopology: true});

    async function run() {
        try {
            await client.connect();
            const database = client.db("mwenbwa");
            const collection = database.collection("playersTest");

            const filter = { username: userId }
            const options = { upsert: false };
            
            const updateDoc = {
                $set: {
                    picture: newPics,
                },
            };

            const result = await collection.updateOne(filter, updateDoc, options);
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );
            
        } catch (err) {
            
            console.error(`Something went wrong: ${err}`);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    //run().catch(console.dir);
    return run();

};

module.exports = {
    dbGetTrees,
    dbGetUser,
    dbGetLeaderboard,
    dbGetLogs,
    dbLogin,
    dbGetTree,
    dbRegister,
    dbBuyTree,
    dbLockTree,
    dbChangeColor,
    dbModifyMail,
    dbModifyUsername,
    dbModifyPassword,
    dbModifyPics
};
