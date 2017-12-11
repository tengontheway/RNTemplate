/**
 通用的搜索栏
 样式: 左边是icon，其次是编辑框，最后是搜索按钮

 - 可以扩充样式
 - 可以定制右侧的按钮
 - 将this.props 全部传递给TextInput，父类的扩展性更强

 <CMSearchBar
     styleEx={{flex:1, backgroundColor: '#eee'}}
     btnStyleEx={{backgroundColor: 'red'}}
     headHeight={50}
     placeHolder= {placeholder}
     onPressBtn={(text)=> this.onPressedSearch(text)}
     customIcon={require('../common/img/close.png')}
     onCustomRight={
          () => {
              return (
                  <TouchableOpacity
                                         onPress={() => {
                                             alert("Click")
                                         }}>
                  <Text>点击</Text>
              </TouchableOpacity>)
          }
      }
/>
 */
//
// import React, {Component} from 'react';
// import
// {
//     Text,
//     TextInput,
//     View,
//     Image,
//     TouchableOpacity,
//     Platform,
//     StyleSheet,
//     Dimensions,
//     PixelRatio,
// } from 'react-native';
// import {Constant} from '../../config/Constant';
// let {height, width} = Dimensions.get('window');
//
// import Button from 'react-native-button';
//
// export default class CMSearchBar extends React.Component {
//     static propTypes = {
//         styleEx: React.PropTypes.object,                 // 整个CMSearchBar的样式补充
//         btnStyleEx: React.PropTypes.object,              // 按钮样式补充
//
//         headHeight: React.PropTypes.number,             // 定制搜索栏高度
//         onChangeHeadHeight: React.PropTypes.func,
//
//         placeholder: React.PropTypes.string,
//         keyboardType: React.PropTypes.string,       // 定制键盘类型
//
//         onPressBtn: React.PropTypes.func,          // 搜索按钮
//         onPressIcon: React.PropTypes.func,      // 点击图标
//         text: React.PropTypes.string,
//
//         onCustomRight: React.PropTypes.func,    // 定制右侧按钮
//         customIcon: React.PropTypes.any,     // 定制ICON
//
//         onChangeText: React.PropTypes.func,
//         iconType: React.PropTypes.string,     // 显示icon类型 "search" "close'
//         inputOnFocus : React.PropTypes.func,
//         inputOnBlur :React.PropTypes.func,
//     };
//
//     static defaultProps = {
//         headHeight: 35,
//         onCustomRight: null,
//         customIcon: require('./../img/search.png'),  // {uri: 'https://facebook.github.io/react/img/logo_og.png'}
//     }
//
//     constructor(props) {
//         super(props);
//
//         this.iconType = this.props.iconType || 'search';
//         this.text = this.props.text || ''
//     };
//
//     componentDidMount() {
//         if (this.props.onChangeHeadHeight)
//             this.props.onChangeHeadHeight(this.props.headHeight);
//     };
//
//     _onChangeText(text) {
//         this.text = text
//
//         if (this.props.onChangeText) {
//             this.props.onChangeText(text);
//         }
//     }
//
//     getText() { return this.text }
//
//     onPressIcon() {
//         if (this.props.onPressIcon)
//             this.props.onPressIcon(this.iconType);
//     }
//
//     onBlur () {
//         this.refs.search.blur()
//     }
//
//     render() {
//         var icon = this.props.customIcon ? this.props.customIcon : require('./../img/search.png')
//         var placeholder = this.props.placeholder || '搜索';
//
//         // 右侧按钮
//         let btn =
//             <Button
//                 containerStyle={[styles.btn_container, this.props.btnStyleEx]}
//                 style={[{flex: 0}]}
//                 onPress={() => {
//                     if (this.props.onPressBtn)
//                         this.props.onPressBtn(this.text)
//                 } }>
//                 <Text style={styles.textBtn}>搜索</Text>
//             </Button>
//
//         let right_btn = this.props.onCustomRight ? this.props.onCustomRight() : btn
//
//         // 提供给上层的接口是不允许被覆盖的，可能内部做了其他处理
//         const {onChangeText, onSubmitEditing, ...others} = this.props
//
//         return (
//             <View style={[styles.head, {height: this.props.headHeight}, this.props.styleEx ? this.props.styleEx : null]}>
//                 <View style={styles.searchBar}>
//                     <View style={styles.searchBG}>
//                         <View>
//                             <TouchableOpacity style={styles.searchBtn}
//                                               onPress={() => {
//                                                   this.onPressIcon()
//                                               }}>
//                                 <Image style={styles.searchImg} source={icon}/>
//                             </TouchableOpacity>
//                         </View>
//
//                         <TextInput
//                             ref="search"
//                             autoCapitalize='none'
//                             autoCorrect={false}
//                             style={[styles.search, {fontSize:Constant.FONT_SMALL}]}
//                             keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
//                             placeholder={placeholder}
//                             defaultValue={this.props.text || ''}
//                             clearButtonMode="while-editing"
//                             {...others}
//                             onChangeText={(text) => this._onChangeText(text) }
//                             onSubmitEditing={
//                                 (event) => {
//                                     if (this.props.onPressBtn)
//                                         this.props.onPressBtn(this.text)
//                                 } }
//                             underlineColorAndroid={'transparent'}
//                             onFocus ={this.props.inputOnFocus}
//                             onBlur ={this.props.inputOnBlur}
//                         />
//                     </View>
//                 </View>
//
//                 {right_btn}
//
//             </View>
//         )
//     }
// }
//
// const styles = StyleSheet.create({
//     btn_container: {
//         marginRight: 10,
//         width: 50,
//         height: 28,
//         overflow: 'hidden',
//         borderRadius: 4,
//         // backgroundColor: 'green',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     textBtn: {
//         color: 'white',
//     },
//     img: {
//         width: 31,
//         height: 31,
//         marginRight: 9
//     },
//     head: {
//         flex: 1,
//         backgroundColor: '#eee',
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     searchBar: {
//         height: 46,
//         // backgroundColor: 'green',
//         flex: 1,
//     },
//     searchBG: {
//         backgroundColor: '#f5f5f5',     //f5f5f5
//         height: 30,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         borderWidth: 1,
//         marginLeft: 17,
//         marginRight: 10,
//         marginTop: 7,
//         marginBottom: 7,
//         paddingLeft: 5,
//
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     search: {
//         flex: 1,
//         height: Platform.OS==='android'?50:30,
//         // backgroundColor: 'white',     //f5f5f5
//         paddingTop:0,
//         paddingBottom:0,
//     },
//
//     searchImg: {
//         width:22,
//         height:22,
//     },
//     searchBtn: {
//         // position: 'absolute',
//         // top: 13,
//         // right: -30,
//         height: 25,
//         width: 25,
//
//     }
// });


export default {}