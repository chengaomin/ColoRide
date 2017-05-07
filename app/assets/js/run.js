
const { app } = nodeRequire('electron').remote;
const path = nodeRequire("path");
const exec = nodeRequire('child_process').exec;

var randomtime= 'RFEditor' + (new Date()).valueOf();

var temp_dir = path.join(app.getPath('temp'), randomtime);

var argfile_path = path.join(temp_dir, 'argfile.txt');

var runing_log_path = path.join(temp_dir, 'runing.txt');

jetpack.write(runing_log_path, '222');

watch_running_log_file();


console.log(temp_dir);


function runTest() {

    var checked_nodes = zTree.getCheckedNodes(true);

    argfile_data = ['--outputdir', temp_dir, '-C', 'off', '-W', '168']

    $.each(checked_nodes, function (index, node) {

        // console.log(index, node);

        if (node.iconSkin == 'testcase') {

            // var case_name = node.name;
            // var suite_name = node.getParentNode().name;
            // console.log(suite_name, case_name);
            get_suite_case_name(node);

            jetpack.write(argfile_path, argfile_data.join('\r\n'));

        }

    });

    var runargs = 'pybot.bat --argumentfile ' + argfile_path + ' --listener E:/workspace/ColoRide/app/plugin/rflistener/RFListener.py:' + randomtime + ' C:/Users/cheng/bbbbbb/aaaaaaa';
    console.log(runargs);
    exec(runargs);

}

var argfile_data = [];

function get_suite_case_name(node) {

    var case_name = [];
    var suite_name = [];

    $.each(node.getPath(), function (i, n) {

        case_name.push(n.name);
        suite_name.push(n.name);

    });

    suite_name.pop();

    argfile_data.push('--suite');
    argfile_data.push(suite_name.join("."));
    argfile_data.push('--test');
    argfile_data.push(case_name.join("."));

    console.log(case_name.join("."));
    console.log(suite_name.join("."));
}



function watch_running_log_file() {
    fs.watch(runing_log_path, 'utf8',(eventType, filename) => {
        console.log(`事件类型是: ${eventType}`);
        if (filename) {
            console.log(`提供的文件名: ${filename}`);
        } else {
            console.log('未提供文件名');
        }; fs.readFile(runing_log_path, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
        });
    });
}