<template>
    <section style="padding: 15px">
        <div style="margin-bottom: 15px">
            <el-button @click="commit" :loading="loading">保存</el-button>
        </div>

        <el-card
            shadow="never"
            class="item-card"
        >
            <header slot="header">预览</header>
            <div :style="config.style.huge" v-show="config.showHuge">

            </div>
            <el-header>
                <el-row :style="config.style.topBar" style="padding: 0 50px">
                    <el-col :span="20">
                        <el-menu
                                 mode="horizontal"
                                 style="border-bottom: 0"
                                 :background-color="config.style.topBar.backgroundColor"
                                 :text-color="config.style.topBar.color"
                                 :active-text-color="config.style.topBar.activeColor"
                        >
                            <el-col :span="4" class="brand">
                                <img src="@/assets/images/logo.png" class="brand-img"/>
                            </el-col>
                            <el-menu-item index="/index">首页</el-menu-item>
                            <el-menu-item index="/products">金融产品</el-menu-item>
                            <el-menu-item index="/news">新闻中心</el-menu-item>
                            <el-menu-item index="/policies">政策指南</el-menu-item>
                            <el-menu-item index="/examples">服务案例</el-menu-item>
                            <el-menu-item index="/institutions">合作机构</el-menu-item>
                            <el-menu-item index="/about">关于我们</el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-header>

        </el-card>

        <el-card
                shadow="never"
                class="item-card"
        >
            <header slot="header">
                <span>巨幅配置</span>
                <el-switch style="float: right;" v-model="config.showHuge"></el-switch>
            </header>
            <div>
                <el-form
                    label-position="right"
                    label-width="120px"
                >
                    <el-form-item label="巨幅高度">
                        <el-col :span="10">
                            <el-input v-model="config.style.huge.height" placeholder="单位px"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="显示模式">
                        <el-col :span="10">
                            <el-input v-model="config.style.huge.backgroundSize">
                            </el-input>
                        </el-col>
                        <el-col>
                            <span class="text-muted" >
                                使用百分比(拉伸图片)来调整图片显示大小，预设cover(覆盖，保持比例)、
                                contain(包含，保持比例)，auto(默认)。如：100% 100%
                            </span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="显示位置">
                        <el-col :span="10">
                            <el-input v-model=" config.style.huge.backgroundPosition"></el-input>
                        </el-col>
                        <el-col>
                            <span class="text-muted">
                                使用top right center 或者以左上角为起点的百分比来选择显示图片位置,如：top left(0% 0%)
                            </span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="图像重复">
                        <el-col :span="10">
                            <el-select
                                    v-model="config.style.huge.backgroundRepeat"
                            >
                                <el-option
                                        label="重复"
                                        value="repeat"
                                >
                                </el-option>
                                <el-option
                                        label="不重复"
                                        value="no-repeat"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col>
                            <span class="text-muted">当图像过窄或过高度过低时是否重复显示</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="显示内容">
                        <el-upload
                                :action="action"
                                :headers="headers"
                                :file-list="hugeFiles"
                                list-type="picture-card"
                                :limit="1"
                                :on-remove="onRemoveHugeItem"
                                :on-success="uploadHugeSuccess">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <el-card
            shadow="never"
            class="item-card"
        >
            <header slot="header">
                <span>导航栏配置</span>
            </header>
            <div>
                <el-form
                    style="width: 40%"
                    label-position="right"
                    label-width="120px"
                >
                    <el-form-item label="字体粗度">
                        <el-input v-model="config.style.topBar.fontWeight"></el-input>
                        <span class="text-muted">100-900,400为正常</span>
                    </el-form-item>
                    <el-form-item label="字体大小">
                        <el-input v-model="config.style.topBar.fontSize"></el-input>
                    </el-form-item>
                    <el-form-item label="字体颜色">
                        <el-color-picker v-model="config.style.topBar.color"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="激活字体颜色">
                        <el-color-picker v-model="config.style.topBar.activeColor"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                        <el-color-picker v-model="config.style.topBar.backgroundColor"></el-color-picker>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card
                shadow="never"
                class="item-card"
        >
            <header slot="header">
                <span>主背景色配置</span>
            </header>
            <div>
                <el-form
                        label-position="right"
                        label-width="120px"
                >
                    <el-tabs>
                        <el-tab-pane label="配置颜色">
                            <el-form-item label="配置颜色">
                                <el-color-picker
                                        v-model="config.style.main.backgroundColor"
                                >
                                </el-color-picker>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="配置图片">
                            <el-form-item label="配置图片">
                                <el-upload
                                        :action="action"
                                        :headers="headers"
                                        :file-list="mainFiles"
                                        :limit="1"
                                        list-type="picture-card"
                                        :on-remove="onRemoveMainItem"
                                        :on-success="uploadMainBgSuccess"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="显示模式">
                                <el-col :span="10">
                                    <el-input v-model="config.style.main.backgroundSize">
                                    </el-input>
                                </el-col>
                                <el-col>
                            <span class="text-muted" >
                                使用百分比(拉伸图片)来调整图片显示大小，预设cover(覆盖，保持比例)、
                                contain(包含，保持比例)，auto(默认)。如：100% 100%
                            </span>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="显示位置">
                                <el-col :span="10">
                                    <el-input v-model=" config.style.main.backgroundPosition"></el-input>
                                </el-col>
                                <el-col>
                            <span class="text-muted">
                                使用top right center 或者以左上角为起点的百分比来选择显示图片位置,如：top left(0% 0%)
                            </span>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="图像重复">
                                <el-col :span="10">
                                    <el-select
                                            v-model="config.style.main.backgroundRepeat"
                                    >
                                        <el-option
                                                label="重复"
                                                value="repeat"
                                        >
                                        </el-option>
                                        <el-option
                                                label="不重复"
                                                value="no-repeat"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col>
                                    <span class="text-muted">当图像过窄或过高度过低时是否重复显示</span>
                                </el-col>
                            </el-form-item>
                        </el-tab-pane>
                    </el-tabs>
                </el-form>
            </div>
        </el-card>
        <el-card
                shadow="never"
                class="item-card"
        >
            <header slot="header">
                <span>轮播图配置</span>
            </header>
            <div>
                <el-upload
                        :action="action"
                        :headers="headers"
                        list-type="picture-card"
                        :on-remove="onRemoveCarouseItem"
                        :on-success="uploadCarouseItemSuccess"
                        :file-list="carouseFiles"
                        >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </el-card>
    </section>
</template>

<script>
  import cof from "@/config/global"
  import {resolveStaticPath} from "@/utils/common";

  export default {
    name: "HomeConfig",
    data(){
      return {
        config:{
          style:{
            huge:{
              backgroundSize: 'auto',
              backgroundRepeat: 'repeat',
              backgroundPosition: 'top left'
            },
            topBar:{

            },
            main:{
              backgroundColor: '#f2f2f2',
              backgroundSize: 'auto',
              backgroundRepeat: 'repeat',
              backgroundPosition: 'top left',
            }
          },
          showHuge:false,
          hugeItem:{},
          mainItem:{},
          carouselItems:[],
        },
        hugeFiles:[],
        mainFiles:[],
        carouseFiles:[],
        action: cof.SERVER_URL+"resources/upload",
        headers:{
          authorization: 'bearer '+this.$sec.getAccessToken()
        },
        loading: false
      }
    },
    methods:{
      loadData(){
        this.$http.get("public/config/home").then(res=>{
          //设置轮播图列表
          this.carouseFiles = res.data.carouselItems.map(item=>{
            return {
              id: item.id,
              name: item.id,
              url: resolveStaticPath(item.path)
            }
          });
          //主背景图
          if (res.data.mainItem.path) {
            this.mainFiles = [{
              id: res.data.mainItem.id,
              name: res.data.mainItem.id,
              url: resolveStaticPath(res.data.mainItem.path)
            }];
          }
          //设置背景图
          res.data.style.huge.backgroundImage =
              'url('+ resolveStaticPath(res.data.hugeItem.path)+')';

          this.hugeFiles = [{
            id: res.data.hugeItem.id,
            name: res.data.hugeItem.id,
            url: resolveStaticPath(res.data.hugeItem.path)
          }];

          this.config = res.data;
        })
      },
      uploadHugeSuccess(response,file,fileList){
        this.config.style.huge.backgroundImage = 'url('+ resolveStaticPath(response.savePath)+')';
        this.config.hugeItem = {
          id: response.id,
          path: response.savePath
        }
      },
      uploadMainBgSuccess(response,file,fileList){
        this.config.style.main.backgroundImage = 'url('+ resolveStaticPath(response.savePath)+')';
        this.config.mainItem = {
          id: response.id,
          path: response.savePath
        }
      },
      uploadCarouseItemSuccess(response,file,fileList){
        file.id = response.id;
        this.config.carouselItems.push({
          id:response.id,
          path: response.savePath
        });
      },
      onRemoveCarouseItem(file,fileList){
        const item = this.config.carouselItems.find(item=>item.id === file.id);
        if (item){
          this.config.carouselItems.splice(this.config.carouselItems.indexOf(item),1);
        }
      },
      onRemoveMainItem(file,fileList){
        this.config.mainItem = {};
        delete this.config.mainItem.backgroundImage;
      },
      onRemoveHugeItem(file,fileList){
        this.config.hugeItem = {};
        delete this.config.hugeItem.backgroundImage;
      },
      commit(){
        this.loading = true;
        this.$http.post("config",{
          key: "home",
          value: JSON.stringify(this.config)
        }).then(res=>{
          this.loading = false;
          this.$message.success("保存成功");
        }).catch(reason => {
          this.loading = false;
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
