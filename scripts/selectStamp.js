// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
//'use strict';

// module.exports = (robot) => {
//   robot.respond(/PING$/i, (res) => {
//     res.send('PONG');
//   });

//   robot.respond(/ADAPTER$/i, (res) => {
//     res.send(robot.adapterName);
//   });

//   robot.respond(/ECHO (.*)$/i, (res) => {
//     res.send(res.match[1]);
//   });

//   robot.respond(/TIME$/i, (res) => {
//     res.send(`Server time is: ${new Date()}`);
//   });
// };


const Jimp = require('jimp');

module.exports = (robot) => {
    const onfile = (res, file) => {
        res.download(file, (path) => {
            let ext = file.name.slice(-4);  // オリジナルの拡張子を取得
            let newFileName = Math.random().toString(32).substring(2) + ext;   // ランダムなファイル名を生成
            Jimp.read(path)
                .then((image) => {
                    return image.resize(250, Jimp.AUTO)  // 横幅を250pxにリサイズし、アスペクト比を維持
                                .writeAsync('images/' + newFileName);
                })
                .then(() => {
                    res.send({
                        path: 'images/' + newFileName
                    });
                })
                .catch((err) => {
                    res.send('Error: ' + err);
                });
        });
    };

    robot.respond('file', (res) => {  // ファイルがアップロードされたときの処理
        onfile(res, res.json);
    });
};

