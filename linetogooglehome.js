const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');

const app = express();

//line messaging API�p
const line = require('@line/bot-sdk');
const client = new line.Client({
  //channelAccessToken: 'MessagingAPI��channelAccessToken������'
  channelAccessToken: '5wAslxIHANxQAS3BYvYYmu0t1GC+3IcJAnV+UIfCJYLXTpFjnIBp/OYugB8UaGS6EYjKslij6ZYMX5VpmWlxp2TKv1XsZJTljWkAJx21GwRksBESzxI6+HsMNUgaJ/1O2dKN87t1o62fgMEpp3hqaAdB04t89/1O/w1cDnyilFU='
});
//const groupId = 'BOT������O���[�vID������';
const groupId = '95e30e4f1e0960410dd2ca89eb2d1f73';

// urlencoded��json�͕ʁX�ɏ���������
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//heroku�Ȃ̂Ń|�[�g�w�肱��Ȋ����炵��
app.listen(process.env.PORT, process.env.IP);
console.log('Server is online.');

//POST������R�������������B
app.post('/', function(req, res) {

//����M�����ڂ������������̂ŁA�悭�킩��Ȃ�����JSON�̒��g�����邩�Ȃ����Ŕ��ʂ���
//�������̓��b�Z�[�W��ǂݏグ��p
  if(req.body.events){

    // ���N�G�X�g�{�f�B���o�́i�m�F�p�j
    console.log(req.body);
    // �p�����[�^���o�́i�m�F�p�j
    console.log(req.body.events[0].message);
    console.log(req.body.events[0].source.groupId);

    //JSON�̒��g��ϐ��ɓ���Ă�B����
    var user1 = req.body.events[0].source.userId;
    var textmain = req.body.events[0].message.text;
    var lineReplyToken = req.body.events[0].replyToken;

    //���v���C�g�[�N�����o�́i�m�F�p�j
    console.log(lineReplyToken);

�@�@�@�@�@�@�@�@//���b�Z�[�W��M��������JSON�ɓ����Ă�UserId���g���ă��[�U�[�������
    client.getProfile(user1)
      .then((profile) => {

�@�@�@�@�@�@�@�@//LINE�̖��O�Ƃ�ID���o�́i�m�F�p�j
        console.log(profile.displayName);
        console.log(profile.userId);

        var username = profile.displayName;
        res.end();

        //IFTTT��Webhook���M
        //POST�̂Ȃ���
        var options = {
          uri: "IFTTT��Webhook���URL������",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            value1: username,
            value2: textmain
          })
        };
        //IFTTT��POST
        request.post(options, function(error, response, body){

          //������ABOT���烊�v���C����
          /*
          var message = {
            type: 'text',
            text: 'Google Home Done!'
          };

          client.replyMessage(lineReplyToken, message)
          .then(() => {
          })
          .catch((err) => {
            // error handling
          });
          */
        });
      })
      .catch((err) => {
        // error handling
�@�@�@�@�@�@�@�@�@�@�@�@�@�@�@�@//�����Ȃ񂩂��Ȃ����Ⴂ���Ȃ�
      });
    }else{

�@�@�@�@�@�@�@�@�@�@�@�@//��������GoogleHome�ɒ��������b�Z�[�W��LINE�ɓ��e�����
      // ���N�G�X�g�{�f�B���o��
      console.log(req.body);
      var texttoline = req.body.text;
      console.log(texttoline);
      res.write('ok');
      res.end();

      const message = {
        type: 'text',
        text: texttoline
      };

      client.pushMessage(groupId, message)
        .then(() => {
        })
        .catch((err) => {
          // error handling
�@�@�@�@�@�@�@�@�@�@�@�@�@�@�@�@�@�@�@�@//�����Ȃ񂩂��Ȃ����Ⴂ���Ȃ�
        });
    }
})