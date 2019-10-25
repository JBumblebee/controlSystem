// const nodeExcel = require('excel-export')
// const express = require('express')
// const router = express.Router()

// /**
//  * @router GET api/excel/downExcel
//  * @desc   下载Excel模板文件
//  * @access public
//  */
// router.get('/downExcel', function (req, res) {
//     var conf = {};
//     conf.name = "mysheet";
//     conf.cols = [];
//     var test = ['通行证', '学校名称', '教学楼', '课室', '设备名称', '设备资产编号', 'SN码', '设备类型', '厂商', '品牌', '型号', '设备状态', '备注', '绑定类型', '寻址'];
//     for (var i = 0; i < test.length; i++) {
//         var temp = {
//             caption: test[i],
//             type: 'string'
//         };
//         conf.cols.push(temp);
//     }
//     var data = [{
//         "secret_key": "aaa",
//         "schoolName": "华南农业大学",
//         "building": "如教一",
//         "classroom": "如课室101",
//         "name": "",
//         "code": "",
//         "sn": "",
//         "type": "",
//         "factory": "",
//         "brand": "",
//         "model": "",
//         "status": "",
//         "remark": "",
//         "bindType": "",
//         "address": "",
//     }]
//     var array = new Array();
//     for (var i = 0; i < data.length; i++) {
//         var temp = new Array();
//         temp[0] = data[i].secret_key
//         temp[1] = data[i].schoolName;
//         temp[2] = data[i].building;
//         temp[3] = data[i].classroom;
//         temp[4] = data[i].name
//         temp[5] = data[i].code;
//         temp[6] = data[i].sn;
//         temp[7] = data[i].type;
//         temp[8] = data[i].factory
//         temp[9] = data[i].brand;
//         temp[10] = data[i].model;
//         temp[11] = data[i].status;
//         temp[12] = data[i].remark
//         temp[13] = data[i].bindType;
//         temp[14] = data[i].address;
//         array.push(temp);
//     }
//     conf.rows = array;
//     var result = nodeExcel.execute(conf);
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
//     var name = encodeURI('uploadFile');
//     res.setHeader("Content-Disposition", "attachment; filename=" + name + ".xlsx");
//     res.end(result, 'binary');

// });

// module.exports = router