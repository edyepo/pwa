const webpush = require('web-push');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors())

app.use(bodyParser.json())

const vapidKeys = {
    "publicKey":"BB9hb9rbykyRF41RAtVIiMqiSAjdF4YlCS-BZgn_Sp29Bu5YGvwBkPIvT-qp-jAd1CqT4lsQr0AcXFC9LJj5lrc",
    "privateKey":"m-q_gp-zI0L7IF5VnpyykwOGdBfY6lM9-dkVNn_4RXc"
}
webpush.setVapidDetails(
    'mailto:support@sweet.sh',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

//------HELPERS-------//
//retorna una respuesta al express
const handlerResponse = (res, data, code = 200)=>{
    res.status(code).send({data})
}


///////controladores

const savePush = (req, res)=>{
    const name = Math.floor(Date.now() / 1000);


    let tokenBrowser = req.body;


    let data = JSON.stringify(tokenBrowser, null, 2);
   
    // fs.writeFile(`./tokens/token-${name}.json`, data, (err)=>{
    //     if(err) throw err;
    //     handlerResponse(res, `Save success`)
    // })
}

const sendPush = (req, res)=>{
    const payload = {
        "notification": {
            "title": "Holllaaaaaaaaaaaa",
            "body": "ttttttttttt",
            "vibrate": [100, 50, 100],
            "icon": "assets/icons/icon-512x512.png",
            "image": "assets/icons/icon-512x512.png",
            data:{url: "http://localhost:4200/"},
            "actions": [{
                "action": "explore",
                "title": "HOLA"
            }]
        }
    }

    const directoryPath = path.join(__dirname, 'tokens');

    fs.readdir(directoryPath, (err, files)=>{
        if(err){
            handlerResponse(res, `Error read`, 500)
        }

        files.forEach((file)=>{
            const tokenRaw = fs.readFileSync(`${directoryPath}/${file}`)

            const tokenParse = JSON.parse(tokenRaw)

            webpush.sendNotification(
                tokenParse,
                JSON.stringify(payload)
            )
            .then(res=>{
                console.log("Enviado !!");
            }).catch(err =>{
                console.log('** El usuario no tiene permisos o las keys no son correctas**');
            })
        })
    })


    res.send({data: 'Se envio la notificacion'})
}



//---------RUTAS--------//
app.route('/save').post(savePush);

app.route('/send').post(sendPush);

const url = '192.168.1.13'
const httpServer = app.listen(9000, url, ()=>{
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
})