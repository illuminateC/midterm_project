<template>
  <div class="container">
    <div style="width: 100%; flex-wrap: wrap; display: flex;">
      <div class="docment-container" v-for="document in documents">
        <div class="document" @mouseover="document.hover = true" @mouseleave="document.hover = false">
          <div class="layer layer11" :class="{ hidden: !document.hover }">
            <i class="el-icon-edit" @click="editDocument(document.prototypeID)"></i>
            <i class="el-icon-delete" @click="deleteDocument(document.prototypeID)"></i>
          </div>
          <div class="layer layer22"></div>
        </div>
        <div class="message-container">
          <div v-if="!document.isEditing" @click="startEditing(document)" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
            {{ document.title }}
          </div>
          <div class="message" v-else>
            <el-input v-model="document.newName" @blur="finishEditing(document)" autofocus></el-input>
          </div>
        </div>
      </div>
      <div class="docment-container2" @click="dialogFormVisible = true">
        <div class="document">
          <div class="layer layer33"></div>
        </div>
      </div>
    </div>
    <el-dialog title="原型图页面设计" :visible.sync="dialogFormVisible">
      <div class="template-header">
        <div class="template-title"><i class="el-icon-files" style="margin-right: 5px;"></i>模板库</div>
      </div>
      <el-form :model="form">
        <el-form-item label="原型图名称" :label-width="formLabelWidth" style="margin-left: -37px; font-size: medium;">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <div style="display: flex; align-items: center;">
          <span class="template-title" style="font-size: medium;">基础样式</span>
        </div>
        <div style="display: flex; flex-wrap: wrap;">
          <div class="block" :class="{ active: isActive_1 }" @click="toggleStyle_1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 50" aria-hidden="true" width="31" height="50">
              <path
                d="M27 0a4 4 0 014 4v42a4 4 0 01-4 4H4a4 4 0 01-4-4V4a4 4 0 014-4h23zm0 2h-2.662a2.957 2.957 0 01-2.91 2.433H9.607a2.957 2.957 0 01-2.91-2.432L4 2a2 2 0 00-1.995 1.85L2 4v42a2 2 0 001.85 1.995L4 48h23a2 2 0 001.995-1.85L29 46V4a2 2 0 00-1.85-1.995L27 2z"
                fill="#415058" fill-rule="nonzero"></path>
            </svg>
            <div style="margin-top: 5px; display: flex; align-items: center;">
              <label class="sc-cPiKLX hQEZkx Select regular unstyled" role="listbox" style="position: relative;">
                <button class="custom-button" type="button" @click="toggleCaret_1">
                  <span class="sc-dcJsrY gnHymN Tooltip Ellipsis isnt-truncated" type="inline">
                    {{ selectedOption_1 }}
                  </span>
                  <span class="text-arrow-gap"></span>
                  <span class="caret" :class="{ 'rotate': isCaretRotated_1 }">
                    <svg width="6" height="4" viewBox="0 0 6 4">
                      <path d="M3 4l3-4H0"></path>
                    </svg>
                  </span>
                </button>
                <ul v-if="isCaretRotated_1" class="dropdown"
                  style="position: absolute; top: 100%; left: -30px; width: 200px;">
                  <li @click="selectOption_1('iPhone 14 Pro Max', '430 x 932')">iPhone 14 Pro Max（430X932）</li>
                  <li @click="selectOption_1('iPhone 14 Pro', '393 x 852')">iPhone 14 Pro（393X852）</li>
                  <li @click="selectOption_1('iPhone 14 Plus/13 Pro Max', '428 x 926')">iPhone 14 Plus/13 Pro Max（428X926）
                  </li>
                  <li @click="selectOption_1('iPhone 14/13 Pro', '390 x 844')">iPhone 14/13 Pro（390X844）</li>
                  <li @click="selectOption_1('iPhone 11 Pro / X', '375 x 812')">iPhone 11 Pro / X（375X812）</li>
                  <li @click="selectOption_1('iPhone 11 / 11 Pro Max', '414 x 896')">iPhone 11 / 11 Pro Max（414X896）</li>
                  <li @click="selectOption_1('iPhone 8 Plus', '414 x 736')">iPhone 8 Plus（414X736）</li>
                  <li @click="selectOption_1('iPhone 8', '375 x 667')">iPhone 8（375X667）</li>
                  <li @click="selectOption_1('Huawei P8', '360 x 640')">Huawei P8（360X640）</li>
                  <li @click="selectOption_1('Huawei P40', '395 x 856')">Huawei P40（395X856）</li>
                  <li @click="selectOption_1('Google Pixel 2', '411 x 731')">Google Pixel 2（411X731）</li>
                  <li @click="selectOption_1('Google Pixel 2 XL', '411 x 823')">Google Pixel 2 XL（411X823）</li>
                </ul>
              </label>
            </div>
            <div class="selectedSize">
              <span>{{ selectedSize_1 }}</span>
            </div>
          </div>
          <div class="block" :class="{ active: isActive_2 }" @click="toggleStyle_2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 45" aria-hidden="true" width="58" height="46">
              <path
                d="M54 0a4 4 0 014 4v37a4 4 0 01-4 4H4a4 4 0 01-4-4V4a4 4 0 014-4h50zm2 7.357H2V41a2 2 0 001.85 1.995L4 43h50a2 2 0 001.995-1.85L56 41V7.357zM5 3a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z"
                fill="#415058" fill-rule="nonzero"></path>
            </svg>
            <div style="margin-top: 5px; display: flex; align-items: center;">
              <label class="sc-cPiKLX hQEZkx Select regular unstyled label-container" role="listbox"
                style="position: relative;">
                <button class="custom-button" type="button" @click="toggleCaret_2">
                  <span class="sc-dcJsrY gnHymN Tooltip Ellipsis isnt-truncated" type="inline">
                    {{ selectedOption_2 }}
                  </span>
                  <span class="text-arrow-gap"></span> <!-- 空的占位符，用来控制文本和箭头间距 -->
                  <span class="caret" :class="{ 'rotate': isCaretRotated_2 }">
                    <svg width="6" height="4" viewBox="0 0 6 4">
                      <path d="M3 4l3-4H0"></path>
                    </svg>
                  </span>
                </button>
                <ul v-if="isCaretRotated_2" class="dropdown"
                  style="position: absolute; top: 100%; left: -80px; width: 200px;">
                  <li @click="selectOption_2('网页', '1440 x 1024')">网页（1440X1024）</li>
                  <li @click="selectOption_2('智能电视', '1920 x 1080')">智能电视（1920X1080）</li>
                  <li @click="selectOption_2('MacBook Pro', '1440 x 900')">MacBook Pro（1440X900）</li>
                  <li @click="selectOption_2('iMac', '1280 x 720')">iMac（1280X720）</li>
                </ul>
              </label>
            </div>
            <div class="selectedSize">
              <span>{{ selectedSize_2 }}</span>
            </div>
          </div>
          <div class="block" :class="{ active: isActive_3 }" @click="toggleStyle_3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 45" aria-hidden="true" width="58" height="45">
              <path
                d="M54 0a4 4 0 014 4v37a4 4 0 01-3.8 3.995L54 45H4a4 4 0 01-4-4V4a4 4 0 014-4h50zm0 2H11a2 2 0 00-1.995 1.85L9 4v37a2 2 0 001.85 1.995L11 43h43a2 2 0 001.995-1.85L56 41V4a2 2 0 00-1.85-1.995L54 2zM4.5 20a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                fill="#415058" fill-rule="nonzero"></path>
            </svg>
            <div style="margin-top: 5px; display: flex; align-items: center;">
              <label class="sc-cPiKLX hQEZkx Select regular unstyled" role="listbox" style="position: relative;">
                <button class="custom-button" type="button" @click="toggleCaret_3">
                  <span class="sc-dcJsrY gnHymN Tooltip Ellipsis isnt-truncated" type="inline">
                    {{ selectedOption_3 }}
                  </span>
                  <span class="text-arrow-gap"></span> <!-- 空的占位符，用来控制文本和箭头间距 -->
                  <span class="caret" :class="{ 'rotate': isCaretRotated_3 }">
                    <svg width="6" height="4" viewBox="0 0 6 4">
                      <path d="M3 4l3-4H0"></path>
                    </svg>
                  </span>
                </button>
                <ul v-if="isCaretRotated_3" class="dropdown"
                  style="position: absolute; top: 100%; left: -70px; width: 200px;">
                  <li @click="selectOption_3('iPad mini', '768 x 1024')">iPad mini（768X1024）</li>
                  <li @click="selectOption_3('iPad Pro 11', '834 x 1194')">iPad Pro 11（834X1194）</li>
                  <li @click="selectOption_3('iPad Pro 12.9', '1024 x 1366')">iPad Pro 12.9（1024X1366）</li>
                </ul>
              </label>
            </div>
            <div class="selectedSize">
              <span>{{ selectedSize_3 }}</span>
            </div>
          </div>
          <div class="block" :class="{ active: isActive_4 }" @click="toggleStyle_4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" width="36" height="36">
              <path d="M20 0v16h16v4H20v16h-4V20H0v-4h16V0h4z" fill="#415058" fill-rule="nonzero"></path>
            </svg>
            <div style="margin-top: 5px; display: flex; align-items: center;">
              <label class="sc-cPiKLX hQEZkx Select regular unstyled" role="listbox">
                <span class="sc-dcJsrY gnHymN Tooltip Ellipsis isnt-truncated" type="inline"
                  style="color: #000000; font-size: 13.3333px; font: Arial;">
                  自定义大小
                </span>
                <div class="customizeInput">
                  <div class="inputGroup">
                    <span class="title">W</span>
                    <input type="text" class="inputField" v-model="width" placeholder="宽度" />
                  </div>
                  <div class="inputGroup">
                    <span class="title">H</span>
                    <input type="text" class="inputField" v-model="height" placeholder="高度" />
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div class="block" :class="{ active: isActive_5 }" @click="toggleStyle_5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 55" aria-hidden="true" width="35" height="55">
              <path
                d="M25 46v5a4 4 0 01-4 4h-9a4 4 0 01-4-4v-5h17zm4-35a4 4 0 014 4h1a1 1 0 011 1v5a1 1 0 01-1 1h-1v18a4 4 0 01-4 4H4a4 4 0 01-4-4V15a4 4 0 014-4h25zm0 2H4a2 2 0 00-1.995 1.85L2 15v25a2 2 0 001.85 1.995L4 42h25a2 2 0 001.995-1.85L31 40V15a2 2 0 00-1.85-1.995L29 13zM21 0a4 4 0 014 4v5H8V4a4 4 0 014-4h9z"
                fill="#415058" fill-rule="nonzero"></path>
            </svg>
            <div style="margin-top: 5px; display: flex; align-items: center;">
              <label class="sc-cPiKLX hQEZkx Select regular unstyled" role="listbox" style="position: relative;">
                <button class="custom-button" type="button" @click="toggleCaret_5">
                  <span class="sc-dcJsrY gnHymN Tooltip Ellipsis isnt-truncated" type="inline">
                    {{ selectedOption_5 }}
                  </span>
                  <span class="text-arrow-gap"></span> <!-- 空的占位符，用来控制文本和箭头间距 -->
                  <span class="caret" :class="{ 'rotate': isCaretRotated_5 }">
                    <svg width="6" height="4" viewBox="0 0 6 4">
                      <path d="M3 4l3-4H0"></path>
                    </svg>
                  </span>
                </button>
                <ul v-if="isCaretRotated_5" class="dropdown"
                  style="position: absolute; top: 100%; left: -43px; width: 200px;">
                  <li @click="selectOption_5('Apple Watch 38mm', '136 x 170')">Apple Watch 38mm（136X170）</li>
                  <li @click="selectOption_5('Apple Watch 40mm', '162 x 197')">Apple Watch 40mm（162X197）</li>
                  <li @click="selectOption_5('Apple Watch 42mm', '156 x 195')">Apple Watch 42mm（156X195）</li>
                  <li @click="selectOption_5('Apple Watch 44mm', '184 x 224')">Apple Watch 44mm（184X224）</li>
                </ul>
              </label>
            </div>
            <div class="selectedSize">
              <span>{{ selectedSize_5 }}</span>
            </div>
          </div>
          <div class="block" :class="{ active: isActive_6 }" @click="toggleStyle_6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 38" aria-hidden="true" width="58" height="38">
              <path
                d="M53.763 0a4 4 0 013.993 4.23l-1.73 30A4 4 0 0152.034 38H5.967a4 4 0 01-3.994-3.77l-1.73-30A4 4 0 014.238 0h49.526zm-4.834 2H9.037l-.034.002a1 1 0 00-.93.95v.116l2.196 32a1 1 0 00.887.926l.111.006h35.466a1 1 0 00.984-.821l.014-.11 2.196-32A1 1 0 0048.929 2zM6 23H5a1 1 0 000 2h1a1 1 0 000-2zm47-.04h-1a1 1 0 000 2h1a1 1 0 100-2zM6 17H5a1 1 0 000 2h1a1 1 0 000-2zm47-.04h-1a1 1 0 000 2h1a1 1 0 100-2zM6 11H5a1 1 0 000 2h1a1 1 0 000-2zm47-.04h-1a1 1 0 000 2h1a1 1 0 100-2z"
                fill="#415058" fill-rule="evenodd"></path>
            </svg>
            <div style="margin-top: 5px; display: flex; align-items: center;">
              <label class="sc-cPiKLX hQEZkx Select regular unstyled" role="listbox" style="position: relative;">
                <button class="custom-button" type="button" @click="toggleCaret_6">
                  <span class="sc-dcJsrY gnHymN Tooltip Ellipsis isnt-truncated" type="inline">
                    {{ selectedOption_6 }}
                  </span>
                  <span class="text-arrow-gap"></span> <!-- 空的占位符，用来控制文本和箭头间距 -->
                  <span class="caret" :class="{ 'rotate': isCaretRotated_6 }">
                    <svg width="6" height="4" viewBox="0 0 6 4">
                      <path d="M3 4l3-4H0"></path>
                    </svg>
                  </span>
                </button>
                <ul v-if="isCaretRotated_6" class="dropdown"
                  style="position: absolute; top: 100%; left: -70px; width: 200px;">
                  <li @click="selectOption_6('车载中控', '1280 x 720')">车载中控（1280X720）</li>
                </ul>
              </label>
            </div>
            <div class="selectedSize">
              <span>{{ selectedSize_6 }}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style="display: flex; align-items: center;">
          <span class="template-title" style="font-size: medium;">推荐模板</span>
        </div>
        <div style="display: flex; flex-wrap: wrap;">
          <div class="block" :class="{ active: isActive_21 }" @click="toggleStyle_21">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" width="36" height="36">
              <path d="M20 0v16h16v4H20v16h-4V20H0v-4h16V0h4z" fill="#415058" fill-rule="nonzero"></path>
            </svg>
            <div style="margin-top: 5px; display: flex; align-items: center;">
              <span class="text"
                style="color: rgb(53, 68, 93); font-weight: 500; font-size: 14px; margin-top: 18px; text-align: start;">新建空白原型</span>
            </div>
          </div>
          <div class="block" :class="{ active: isActive_22 }" @click="toggleStyle_22">
            <img src="https://cloudfront.modao.cc/market-template/mt_covers/1/14070/square_cover_1692420599.png"
              alt="线上商城原型" style="width: 154px; height: 116px; object-fit: contain;">
            <div
              style="width: 100%; display: flex; flex-direction: column; align-items: center; padding: 10px 6px 0px 6px; height: 30px;">
              <span class="proto-title"
                style="font-weight: 500; font-size: 12px; color: rgb(53, 68, 93); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">线上商城原型</span>
            </div>
          </div>
          <div class="block" :class="{ active: isActive_23 }" @click="toggleStyle_23">
            <img src="https://cloudfront.modao.cc/market-template/mt_covers/1/10630/square_cover_1669865117.png"
              alt="学术分享平台原型" style="width: 154px; height: 116px; object-fit: contain;">
            <div
              style="width: 100%; display: flex; flex-direction: column; align-items: center; padding: 10px 6px 0px 6px; height: 30px;">
              <span class="proto-title"
                style="font-weight: 500; font-size: 12px; color: rgb(53, 68, 93); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">学术分享平台原型</span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createDocument">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import axios from 'axios'
export default {
  props: {
    freshFlag: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        height: '',
        width: '',
        model: 0,
      },
      formLabelWidth: '120px',
      documents: [
      ],
      projectId: '',
      prototypeID: 1,
      isCaretRotated_1: false,
      isCaretRotated_2: false,
      isCaretRotated_3: false,
      isCaretRotated_5: false,
      isCaretRotated_6: false,
      width: 1024,
      height: 768,
      selectedSize_1: '390 x 844',
      selectedSize_2: '1440 x 1024',
      selectedSize_3: '768 x 1024',
      selectedSize_5: '136 x 170',
      selectedSize_6: '1280 x 720',
      isActive_1: false,
      isActive_2: false,
      isActive_3: false,
      isActive_4: false,
      isActive_5: false,
      isActive_6: false,
      isActive_21: false,
      isActive_22: false,
      isActive_23: false,
      selectedOption_1: 'iPhone 14/13 Pro',
      selectedOption_2: '网页',
      selectedOption_3: 'iPad mini',
      selectedOption_5: 'Apple Watch 38mm',
      selectedOption_6: '车载中控',
    };
  },
  methods: {
    firstNumber(originalString) {
      const numbers = originalString.split('x').map(str => parseInt(str.trim()));
      return numbers[0];
    },
    secondNumber(originalString) {
      const numbers = originalString.split('x').map(str => parseInt(str.trim()));
      return numbers[1];
    },
    toggleStyle_1() {
      this.isActive_1 = !this.isActive_1;
      this.isActive_2 = false;
      this.isActive_3 = false;
      this.isActive_4 = false;
      this.isActive_5 = false;
      this.isActive_6 = false;
      this.form.width = this.firstNumber(this.selectedSize_1);
      this.form.height = this.secondNumber(this.selectedSize_1);
    },
    toggleStyle_2() {
      this.isActive_2 = !this.isActive_2;
      this.isActive_1 = false;
      this.isActive_3 = false;
      this.isActive_4 = false;
      this.isActive_5 = false;
      this.isActive_6 = false;
      this.form.width = this.firstNumber(this.selectedSize_2);
      this.form.height = this.secondNumber(this.selectedSize_2);
    },
    toggleStyle_3() {
      this.isActive_3 = !this.isActive_3;
      this.isActive_1 = false;
      this.isActive_2 = false;
      this.isActive_4 = false;
      this.isActive_5 = false;
      this.isActive_6 = false;
      this.form.width = this.firstNumber(this.selectedSize_3);
      this.form.height = this.secondNumber(this.selectedSize_3);
    },
    toggleStyle_4() {
      this.isActive_4 = !this.isActive_4;
      this.isActive_1 = false;
      this.isActive_2 = false;
      this.isActive_3 = false;
      this.isActive_5 = false;
      this.isActive_6 = false;
      this.form.width = this.width;
      this.form.height = this.height;
    },
    toggleStyle_5() {
      this.isActive_5 = !this.isActive_5;
      this.isActive_1 = false;
      this.isActive_2 = false;
      this.isActive_3 = false;
      this.isActive_4 = false;
      this.isActive_6 = false;
      this.form.width = this.firstNumber(this.selectedSize_5);
      this.form.height = this.secondNumber(this.selectedSize_5);
    },
    toggleStyle_6() {
      this.isActive_6 = !this.isActive_6;
      this.isActive_1 = false;
      this.isActive_2 = false;
      this.isActive_3 = false;
      this.isActive_4 = false;
      this.isActive_5 = false;
      this.form.width = this.firstNumber(this.selectedSize_6);
      this.form.height = this.secondNumber(this.selectedSize_6);
    },
    toggleStyle_21() {
      this.isActive_21 = !this.isActive_21;
      this.isActive_22 = false;
      this.isActive_23 = false;
      this.form.model = 1;
    },
    toggleStyle_22() {
      this.isActive_22 = !this.isActive_22;
      this.isActive_21 = false;
      this.isActive_23 = false;
      this.form.model = 2;
    },
    toggleStyle_23() {
      this.isActive_23 = !this.isActive_23;
      this.isActive_21 = false;
      this.isActive_22 = false;
      this.form.model = 3;
    },
    copyToClipboard(textToCopy) {
      // navigator clipboard 需要https等安全上下文
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // 创建text area
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // 使text area不在viewport，同时设置不可见
        textArea.style.position = "absolute";
        textArea.style.opacity = 0;
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          // 执行复制命令并移除文本框
          document.execCommand('copy') ? res() : rej();
          textArea.remove();
        });
      }
    },
    editDocument(a) {
      let { href } = this.$router.resolve('/design/' + a + '&' + this.projectId);
      window.open(href, `_blank`)
      this.$router.go(0);
    },
    getDocument() {
      axios.get('http://43.143.140.26/api/prototype/getdesign', {
        params: {
          projectID: this.projectId
        }
      })
        .then(res => {
          switch (res.data.errno) {
            case 0: {
              this.documents = res.data.prototypes;
              break;
            }
            case 401: {
              this.$message.error("获取文档信息失败！");
              break;
            }

          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    createDocument() {
      if (this.form.name === '') {
        this.$message.warning("请输入原型图名称");
        return;
      }
      if (this.isActive_1 === false && this.isActive_2 === false && this.isActive_3 === false && this.isActive_4 === false && this.isActive_5 === false && this.isActive_6 === false) {
        this.$message.warning("请选择页面样式");
        return;
      }
      if (this.isActive_21 === false && this.isActive_22 === false && this.isActive_23 === false) {
        this.$message.warning("请选择页面模板");
        return;
      }
      const formData = new FormData();
      formData.append('projectID', this.projectId);
      formData.append('title', this.form.name);
      let canvasStyleData = JSON.parse(localStorage.getItem("canvasStyle"));
      console.log(JSON.stringify(canvasStyleData));
      canvasStyleData.width = this.form.width;
      canvasStyleData.height = this.form.height;
      if (this.form.model === 1) {
        formData.append('canvasStyleData', JSON.stringify(canvasStyleData));
      }
      formData.append('model', this.form.model);
      axios.post('http://43.143.140.26/api/prototype/setprototype', formData, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then(res => {
          switch (res.data.errno) {
            case 0: {
              this.$message.success("创建成功！");
              let prototypeID = res.data.prototypeID;
              let { href } = this.$router.resolve('/design/' + prototypeID + '&' + this.projectId);
              window.open(href, `_blank`)
              this.$router.go(0);
              break;
            }
            case 401: {
              this.$message.error("未知错误！");
              break;
            }
          }
        })
    },
    deleteDocument(a) {
      const formData = new FormData();
      formData.append('prototypeID', a);
      console.log(a);
      axios.post('http://43.143.140.26/api/prototype/deleteprototype', formData, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then(res => {
          switch (res.data.errno) {
            case 0: {
              axios.get('http://43.143.140.26/api/prototype/getdesign', {
                params: {
                  projectID: this.projectId
                }
              })
                .then(res => {
                  switch (res.data.errno) {
                    case 0: {
                      this.documents = res.data.prototypes;
                      break;
                    }
                    case 401: {
                      this.$message.error("获取文档信息失败！");
                      break;
                    }

                  }
                })
                .catch(err => {
                  console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
              this.$message.success("删除成功！");
              break;
            }
            default: {
              this.$message.error("未知错误！");
              break;
            }
          }
        })
      this.getDocument();
      this.$router.go(0);
    },
    startEditing(document) {
      document.isEditing = true;
      document.newName = document.title;
    },
    finishEditing(document) {
      if (document.newName.trim() !== '') {
        if (document.newName !== document.title) {
          document.title = document.newName;
          let name = document.newName;
          let prototypeID = document.prototypeID;
          let formData = new FormData();
          formData.append('prototypeID', prototypeID);
          formData.append('title', name);
          axios.post('http://43.143.140.26/api/prototype/rename', formData, {
            headers: { "content-type": "application/x-www-form-urlencoded" },
          })
            .then(res => {              /* res 是 response 的缩写 */
              switch (res.data.errno) {
                case 0: {
                  axios.get('http://43.143.140.26/api/prototype/getdesign', {
                    params: {
                      projectID: this.projectId
                    }
                  })
                    .then(res => {
                      switch (res.data.errno) {
                        case 0: {
                          this.documents = res.data.prototypes;
                          break;
                        }
                        case 401: {
                          this.$message.error("获取文档信息失败！");
                          break;
                        }

                      }
                    })
                    .catch(err => {
                      console.log(err);         /* 若出现异常则在终端输出相关信息 */
                    })
                  this.$message.success("成功！");
                  break;
                }
                default: {
                  this.$message.warning("失败！");
                  break;
                }
              }
            })
            .catch(err => {
              console.log(err);         /* 若出现异常则在终端输出相关信息 */
            })
        }
      } else {
        this.$message.warning("名称不能为空！");
      }
      document.isEditing = false;
    },
    toggleCaret_1() {
      this.isCaretRotated_1 = !this.isCaretRotated_1;
      this.isCaretRotated_2 = false;
      this.isCaretRotated_3 = false;
      this.isCaretRotated_5 = false;
      this.isCaretRotated_6 = false;
    },
    toggleCaret_2() {
      this.isCaretRotated_2 = !this.isCaretRotated_2;
      this.isCaretRotated_3 = false;
      this.isCaretRotated_5 = false;
      this.isCaretRotated_6 = false;
      this.isCaretRotated_1 = false;
    },
    toggleCaret_3() {
      this.isCaretRotated_3 = !this.isCaretRotated_3;
      this.isCaretRotated_2 = false;
      this.isCaretRotated_5 = false;
      this.isCaretRotated_6 = false;
      this.isCaretRotated_1 = false;
    },
    toggleCaret_5() {
      this.isCaretRotated_5 = !this.isCaretRotated_5;
      this.isCaretRotated_2 = false;
      this.isCaretRotated_3 = false;
      this.isCaretRotated_6 = false;
      this.isCaretRotated_1 = false;
    },
    toggleCaret_6() {
      this.isCaretRotated_6 = !this.isCaretRotated_6;
      this.isCaretRotated_2 = false;
      this.isCaretRotated_3 = false;
      this.isCaretRotated_5 = false;
      this.isCaretRotated_1 = false;
    },
    selectOption_1(option, option1) {
      // 处理选项的选择逻辑，可以将选中的值应用到按钮上
      // 在这个例子中，我们只是简单地在控制台打印选中的选项
      this.selectedOption_1 = option;
      this.selectedSize_1 = option1;
      this.isDropdownOpen = false;
    },
    selectOption_2(option, option1) {
      // 处理选项的选择逻辑，可以将选中的值应用到按钮上
      // 在这个例子中，我们只是简单地在控制台打印选中的选项
      this.selectedOption_2 = option;
      this.selectedSize_2 = option1;
      this.isDropdownOpen = false;
    },
    selectOption_3(option, option1) {
      // 处理选项的选择逻辑，可以将选中的值应用到按钮上
      // 在这个例子中，我们只是简单地在控制台打印选中的选项
      this.selectedOption_3 = option;
      this.selectedSize_3 = option1;
      this.isDropdownOpen = false;
    },
    selectOption_5(option, option1) {
      // 处理选项的选择逻辑，可以将选中的值应用到按钮上
      // 在这个例子中，我们只是简单地在控制台打印选中的选项
      this.selectedOption_5 = option;
      this.selectedSize_5 = option1;
      this.isDropdownOpen = false;
    },
    selectOption_6(option, option1) {
      // 处理选项的选择逻辑，可以将选中的值应用到按钮上
      // 在这个例子中，我们只是简单地在控制台打印选中的选项
      this.selectedOption_6 = option;
      this.selectedSize_6 = option1;
      this.isDropdownOpen = false;
    },
  },
  created() {
    this.projectId = this.$route.params.projectID;
    this.getDocument();
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'overflow: auto;');
  },
  watch: {
    freshFlag(newVal, oldVal) {
      console.log("freshFlagChange");
      this.getDocument();
    }
  }
};
</script>
  
<style>
.el-dialog__body {
  max-height: 500px;
  /* 设置最大高度 */
  overflow-y: auto;
  /* 添加垂直滚动条 */
}

.docment-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  /* 减小相邻元素之间的间距 */
  width: 100px;
  height: 180px;
  margin: 10px 20px 0px 20px;
}

.docment-container2 {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  /* 减小相邻元素之间的间距 */
  width: 100px;
  margin: 10px 20px 0px 20px;
}

.document {
  position: relative;
  width: 100px;
  height: 100px;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}

.layer11 {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 2;
  /* 设置较高的 z-index 值 */
}

.layer11 i {
  margin: 0 10px;
}

.layer22 {
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  background-image: url('../assets/400.png');
  background-size: cover;
  /* 添加背景图片填充容器的样式 */
  background-position: center;
  /* 添加背景图片居中对齐的样式 */
}

.layer33 {
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  background-image: url('../assets/1692969768431.png');
  background-size: cover;
  /* 添加背景图片填充容器的样式 */
  background-position: center;
  /* 添加背景图片居中对齐的样式 */
}

.hidden {
  visibility: hidden;
}

.document:hover .layer11 {
  visibility: visible;
}

.document:hover .layer22 {
  opacity: 0.3;
}

.document:hover .layer33 {
  opacity: 0.7;
}

.message-container {
  margin-top: 10px;
  /* 减小上方的垂直间距 */
  width: 100%;
  text-align: center;
  max-height: 2.6em;
  /* 2行文本加上1行省略号 */
  overflow: hidden;
  position: relative;
}

.message {
  font-size: 20px;
  height: 50px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  height: 100%;
  /* 添加滚动条，当内容溢出时 */

}

.bWewju .topHeader {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 13px 18px 13px 26px;
  border-bottom: 1px solid rgba(232, 232, 232, 0.7);
  height: 60px;
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.template-title {
  font-size: 20px;
  font-weight: bold;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
}

.search-box input {
  border: none;
  outline: none;
  width: 200px;
  padding: 5px;
}

.search-box i {
  margin-left: 5px;
  cursor: pointer;
}

.block {
  margin-top: 10px;
  /* 添加间距来使下面的块下移一些 */
  width: 154px;
  height: 146px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  margin: 10px;
}

.block:hover {
  /* 蓝色边框样式 */
  border-color: blue;
}

.block.active {
  /* 蓝色边框样式 */
  border-color: blue;
}

.custom-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.custom-button:hover {
  color: rgb(26, 26, 192);
  /* 鼠标移入时文字变为蓝色 */
}

.text-arrow-gap {
  width: 2px;
  /* 文本和箭头的间距 */
  display: inline-block;
  vertical-align: middle;
  /* 确保文本和箭头垂直居中 */
}

.caret.rotate {
  transform: rotate(180deg);
  /* 三角箭头向上的旋转效果 */
}

.block {
  display: flex;
  align-items: center;
}

.customizeContent {
  margin-top: 5px;
}

.bottomTitle {
  font-size: 14px;
  font-weight: bold;
}

.customizeInput {
  display: flex;
  margin-top: 4px;
}

.inputGroup {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.title {
  margin-right: 3px;
  font-size: 14px;
  /* 调整字体大小 */
}

.inputField {
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 2px;
  width: 40px;
  font-size: 13px;
  margin-top: 2px;
  /* 调整顶部间距 */
}

.inputField.inputNumber input::placeholder {
  font-size: 13px;
  color: #aaa;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 5px 0 0;
  max-height: 150px;
  /* 设置最大高度，根据需要进行调整 */
  overflow: auto;
  /* 添加滚动条 */
}

.option-item {
  /* 确保每个选项不超过容器的宽度 */
  max-width: 100%;
  white-space: nowrap;
  /* 防止文字换行 */
  overflow: hidden;
  text-overflow: ellipsis;
  /* 添加省略号 */
}

.dropdown li {
  padding: 8px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f2f2f2;
}

.label-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>