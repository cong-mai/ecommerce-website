const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, '.env') })
const dns = require('dns')
// Node's resolver (c-ares) can't complete SRV lookups against some IPv6-only
// DNS servers, which breaks mongodb+srv:// connections even though the OS
// resolves the same record fine. Force IPv4 DNS servers to avoid that.
dns.setServers(['8.8.8.8', '1.1.1.1'])
const mongoose = require('mongoose')
const createApp = require('./app')

const app = createApp()
const port = process.env.PORT || 3001

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
      console.log("Connect Db success!");
    })
    .catch((err) =>{
      console.log(err)
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
