document.addEventListener('DOMContentLoaded', () => {
    //插件中，Html的属性（checkPage）
    const btn_chk = document.getElementById('checkPage');
    //确认是否存在
    if (btn_chk) {
        console.log('CheckPage');
        //绑定点击事件
        btn_chk.addEventListener("click", () => {
            //绑定查询的tabs
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                //获取当前页面tab
                const activeTab = tabs[0];
                console.log(tabs);
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    function: fnc_checkPage,
                }, (results) => {
                    //返回结果
                    console.log(results);
                    const val = results[0].result;
                    console.log('val', val);
                });
            });
        });
    } else {
        console.error("Not Found!");
    }

    //插件中，Html的属性（readFormValue）
    const btn_set = document.getElementById('readFormValue');
    //确认是否存在
    if (btn_set) {
        console.log('readFormValue');
        //绑定点击事件
        btn_set.addEventListener("click", () => {
            //绑定查询的tabs
            console.info('Button clicked!')
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                //获取当前页面tab
                const activeTab = tabs[0];
                chrome.scripting.executeScript(
                    {
                        target: { tabId: activeTab.id },
                        function: getCustomAttributeValue
                    },
                    (results) => {
                        //返回结果
                        console.log('results',results);
                        const customAttributeValue = results[0].result;
                        console.log('position1:', customAttributeValue);
                        
                    }
                );
            });
        });

    } else {
        console.error('not found!')
    }
});

function fnc_checkPage() {
    //当前页面中的属性（ele_box、accordion）
    const sub_page = document.getElementsByClassName('ele_box');
    const main_page = document.getElementById('accordion');
    //判断属性是否存在
    if (main_page) {
        return 'main';
    } else if (sub_page) {
        return 'sub';
    }
}

function getCustomAttributeValue() {

    //当前页面中的属性（ele_box、accordion），并设定值
    const pess = "358000|358999";
    const strs = "99.0";
    const position1 = document.getElementById('position1');
    const percent1 = document.getElementById('percent1');
    position1.value = pess;
    percent1.value = strs;

    const position = document.getElementById('position');
    const percent = document.getElementById('percent');
    position.value = pess;
    percent.value = strs;

    console.log($('#position1').value());
   
    //提交页面
    const cpath = document.getElementById('cpath').value;
    const frm = document.getElementById('readvideoform');
    frm.setAttribute("action",cpath+"/xml/video");
    frm.submit();

    //返回结果
    return document.getElementById('position1').value;

}