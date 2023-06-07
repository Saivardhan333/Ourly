//  <View style={styles.container}>
//       <View style={styles.screen}>
//         <TextInput
//           style={styles.Textinput}
//           value={working}
//           placeholder="What are you working on .  .  ."
//           placeholderTextColor="#000000"
//           onChangeText={val => {
//             setworking(val);
//           }}
//         />
//         <View style={styles.dropdownContainer}>
//           <View style={{zIndex: 1}}>
//             <Dropdown
//               style={styles.dropdown}
//               items={Items}
//               open={isopen}
//               setOpen={() => {
//                 setisopen(!isopen);
//               }}
//               setValue={val => {
//                 setCurrentValue(val);
//               }}
//               value={currentValue}
//               placeholder="Project"
//               placeholderStyle={{fontSize: 20}}
//             />
//           </View>

//           <View style={{}}>
//             {currentValue === '' ? (
//               <View style={{justifyContent: 'center', alignItems: 'center'}}>
//                 <Icons
//                   name="tago"
//                   size={50}
//                   color="black"
//                   alignItems="center"
//                   style={styles.tag}
//                 />
//               </View>
//             ) : currentValue.includes('Internal') ? (
//               <Text
//                 style={{
//                   fontWeight: 'bold',
//                   fontSize: 18,
//                   marginTop: 20,

//                   width: 150,
//                   paddingLeft: 40,
//                 }}>
//                 Internal
//               </Text>
//             ) : (
//               <Text
//                 style={{
//                   fontWeight: 'bold',
//                   fontSize: 18,
//                   marginTop: 20,

//                   width: 150,
//                   paddingLeft: 40,
//                 }}>
//                 External
//               </Text>
//             )}
//           </View>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             zIndex: -1,
//           }}>
//           <TouchableOpacity
//             style={{
//               borderWidth: 2,
//               width: 150,
//               padding: 8,
//               borderRadius: 8,
//               backgroundColor: 'white',
//             }}
//             onPress={() => setOpen1(true)}>
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 fontSize: 18,
//                 alignSelf: 'center',
//               }}>
//               {intime ? (
//                 <Text style={{color: 'black'}}>{intime}</Text>
//               ) : (
//                 <Text style={{color: 'black'}}>Intime</Text>
//               )}
//             </Text>
//             <DatePicker
//               modal
//               open={open1}
//               date={indate}
//               mode="time"
//               onConfirm={date => {
//                 setOpen1(false);
//                 setInDate(date);
//                 hours = date.getHours();
//                 minutes = date.getMinutes();
//                 {
//                   minutes <= 9 ? (minutes = '0' + minutes) : minutes;
//                 }
//                 hours >= 12
//                   ? (time = hours + ':' + minutes + ':' + '00')
//                   : (time = hours + ':' + minutes + ':' + '00');

//                 setintime(time);
//               }}
//               onCancel={() => {
//                 setOpen1(false);
//               }}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               borderWidth: 2,
//               width: 150,
//               padding: 8,
//               borderRadius: 8,
//               backgroundColor: 'white',
//               marginLeft: 10,
//             }}
//             onPress={() => setOpen2(true)}>
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 fontSize: 18,
//                 alignSelf: 'center',
//               }}>
//               {outtime ? (
//                 <Text style={{color: 'black'}}> {outtime}</Text>
//               ) : (
//                 <Text style={{color: 'black'}}>OutTime</Text>
//               )}
//             </Text>
//             <DatePicker
//               modal
//               open={open2}
//               date={outdate}
//               mode="time"
//               onConfirm={date => {
//                 hh = 1;
//                 setOpen2(false);
//                 setOutDate(date);

//                 hours2 = date.getHours();
//                 minutes2 = date.getMinutes();
//                 {
//                   minutes2 <= 9
//                     ? minutes2 > 0
//                       ? (minutes2 = '0' + minutes2)
//                       : Alert.alert('data should not be null')
//                     : minutes2;
//                 }
//                 hours2 >= 12
//                   ? (time2 = hours2 + ':' + minutes2 + ':' + '00')
//                   : (time2 = hours2 + ':' + minutes2 + ':' + '00');
//                 setouttime(time2);
//                 otime = time2;
//                 {
//                   hours2 > hours
//                     ? (setouttime(time2), (otime = time2))
//                     : hours2 == hours
//                     ? minutes2 > minutes
//                       ? Alert.alert('please enter valid data')
//                       : Alert.alert('please enter valid data')
//                     : Alert.alert('please enter valid data');
//                 }
//                 let setindatetime = formatedDate + ' ' + intime;
//                 let setoutdatetime = formatedDate + ' ' + otime;
//                 setnewdate(setindatetime);
//                 setnewdate2(setoutdatetime);
//               }}
//               onCancel={() => {
//                 setOpen1(false);
//               }}
//             />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             zIndex: -1,
//           }}>
//           <TouchableOpacity
//             onPress={() => setShowCalendar(true)}
//             style={{
//               borderWidth: 2,
//               padding: 8,
//               width: 150,
//               borderRadius: 8,
//               backgroundColor: 'white',
//               marginTop: 5,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text style={{fontSize: 18, fontWeight: 'bold'}}>
//               {selected ? (
//                 <Text> {selected}</Text>
//               ) : (
//                 <Text style={{color: 'black'}}>{formatedDate}</Text>
//               )}
//               <Modal visible={showCalendar}>
//                 <View
//                   style={{
//                     backgroundColor: '#000000aa',
//                     flex: 1,
//                   }}>
//                   <View style={{flex: 2}}></View>
//                   <View style={{flex: 6}}>
//                     <View
//                       style={{
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}>
//                       <View>
//                         <Calendar
//                           onDayPress={day => {
//                             setSelected(day.dateString);
//                             setShowCalendar(false);
//                           }}
//                           markedDates={{
//                             [selected]: {
//                               selected: true,
//                               disableTouchEvent: true,
//                               selectedDotColor: 'orange',
//                             },
//                           }}
//                         />
//                       </View>
//                     </View>
//                   </View>
//                   <View style={{flex: 2}}></View>
//                 </View>
//               </Modal>
//             </Text>
//           </TouchableOpacity>
//           <TextInput
//             style={{
//               borderWidth: 2,
//               padding: 8,
//               width: 150,
//               borderRadius: 8,
//               backgroundColor: 'white',
//               marginTop: 5,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 fontFamily: 'Roboto-Medium',
//                 fontSize: 20,
//                 fontWeight: 'bold',
//                 color: 'black',
//               }}>
//               {hh1}:{mm2}:{ss3}
//             </Text>
//           </TextInput>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'row',
//             marginTop: 5,
//             justifyContent: 'space-around',
//             zIndex: -1,
//           }}>
//           {/* {
//               <TouchableHighlight
//                 onPress={toggleStopwatch}
//                 style={{
//                   backgroundColor: 'white',
//                   borderWidth: 2,
//                   borderRadius: 10,
//                   width: 70,
//                   paddingLeft: 5,
//                 }}>
//                 <Text style={{fontSize: 25}}>
//                   {!stopwatchStart ? 'Start' : 'Stop'}
//                 </Text>
//               </TouchableHighlight>
//             } */}
//           <TouchableHighlight
//             style={{
//               backgroundColor: 'white',
//               borderWidth: 2,
//               borderRadius: 10,
//               width: 90,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text style={{fontSize: 25, color: 'black'}}>Reset</Text>
//           </TouchableHighlight>
//           <TouchableOpacity
//             onPress={() => {
//               Adding();
//               setModalVisible(false);
//             }}
//             style={{
//               backgroundColor: 'white',
//               borderWidth: 2,
//               borderRadius: 10,
//               width: 60,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 fontSize: 25,
//                 color: 'black',
//               }}>
//               Add
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={{}}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: 'blue',
//               width: 150,
//               height: 40,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 20,
//               alignSelf: 'center',
//             }}
//             onPress={() => {
//               setModalVisible(false);
//             }}>
//             <Text
//               style={{
//                 fontSize: 20,
//                 color: '#fff',
//                 fontWeight: '800',
//               }}>
//               Close
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 5,
//   },
//   screen: {
//     flex: 5,
//   },
//   Textinput: {
//     borderWidth: 2,
//     height: 50,
//     width: '100%',
//     fontSize: 20,
//     borderRadius: 10,
//     marginTop: 8,
//     backgroundColor: '#FFFFFF',
//   },
//   dropdownContainer: {
//     marginTop: 5,
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dropdown: {
//     borderWidth: 2,
//     height: 50,
//     fontSize: 20,
//     borderRadius: 10,
//     width: 150,
//   },
//   tag: {
//     fontSize: 50,
//     width: 150,
//   },
<View
  style={{
    fleDxirection: 'row',
    width: '100%',
    borderWidth: 2,
    padding: 5,
    borderRadius: 3,
  }}>
  <View style={{flex: 4}}>
    <Text style={styles.text}>Project</Text>
    {graphdata.response[1].map(val => (
      <Text style={{fontSize: 16}}>{val.project_name}</Text>
    ))}
  </View>
  <View style={{flex: 3}}>
    <Text style={styles.text}>Client</Text>
    {graphdata.response[1].map(val =>
      val.value.map(val1 => (
        <Text style={{fontSize: 16}}>{val1.client_name}</Text>
      )),
    )}
  </View>
  <View style={{flex: 3}}>
    <Text style={styles.text}>Duration</Text>
    {graphdata.response[1].map(val =>
      val.value.map(val1 => (
        <Text style={{fontSize: 16}}>{val1.total_time}</Text>
      )),
    )}
  </View>
</View>;
