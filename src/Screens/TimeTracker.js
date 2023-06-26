import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  Text,
  Modal,
  SectionList,
  Alert,
  ActivityIndicator,
  AppState,
  FlatList,
} from 'react-native';
import moment from 'moment';
import {baseurl} from '../utils/urls';
import Icons2 from 'react-native-vector-icons/MaterialIcons';
import Icons1 from 'react-native-vector-icons/Feather';
import Dropdown from 'react-native-dropdown-picker';
import Icons from 'react-native-vector-icons/AntDesign';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconsss from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TimeTracker1 from './TimeTracker1';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import {useNavigation} from '@react-navigation/native';

const TimeTracker = props => {
  const navigation = useNavigation();
  const [workchild, setworkchild] = useState('');
  const [loading, setLoading] = useState(true);
  const [Added, setAdded] = useState([]);
  const [Added1, setAdded1] = useState([]);
  const [isopen, setisopen] = useState(false);
  const [currentValuechild, setCurrentValuechild] = useState('');
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [stopWatchStart, setstopWatchStart] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const currentTime = new Date().toLocaleTimeString();
  const endTime = new Date().toLocaleTimeString();
  const currentDate = moment().format('YYYY-MM-DD');
  const [stopWatchTime, setStopwatchTime] = useState('');
  const [nseconds, setSeconds] = useState(0);
  const [nminutes, setMinutes] = useState(0);
  const [nhours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [isAppDataa, setisAppData] = useState(null);
  const [main, setmain] = useState();
  const [header, setheader] = useState();
  const [child, setchild] = useState();
  const [data, setdata] = useState([]);
  const [dt, setdt] = useState();
  const [isdropdownopen, setisdropdownopen] = useState(false);
  let [employee_id, setemployee_Id] = useState();
  const [renderData, setRenderData] = useState(false);
  const d = [];
  const d1 = [];
  const d2 = [];
  let stopwatchTime = 0;
  useEffect(() => {
    retrieveData();
  }, [modalVisible, renderData]);

  const retrieveData = async () => {
    try {
      setLoading(true);
      const storedResponse = await AsyncStorage.getItem('loginResponse');
      if (storedResponse !== null) {
        let loginResponse = JSON.parse(storedResponse);
        employee_id = {employee_id: loginResponse[0].employee_id};
        const response = await axios.post(
          `${baseurl}/api/timetracking/get/all/weeks/task/details/by/employeeid/list`,
          employee_id,
        );

        const resdata = response.data.response.map(val => val);
        setemployee_Id(loginResponse[0].employee_id);
        // console.log('=========>', resdata);
        setdata(resdata);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  let timetime = '';
  useEffect(() => {
    let interval;
    let startTime;

    if (isRunning) {
      interval = BackgroundTimer.setInterval(() => {
        setSeconds(seconds => {
          if (seconds === 59) {
            setMinutes(minutes => {
              if (minutes === 59) {
                setHours(hours => hours + 1);
                return 0;
              }
              return minutes + 1;
            });
            return 0;
          }
          return seconds + 1;
        });
      }, 1000);

      startTime = new Date().getTime().toString();
      AsyncStorage.setItem('startTimes', startTime);
    }

    return () => {
      BackgroundTimer.clearInterval(interval);
      if (isRunning) {
        AsyncStorage.removeItem('startTimes');
      }
    };
  }, [isRunning]);
  useEffect(() => {
    const retrieveStartTime = async () => {
      const startTimeString = await AsyncStorage.getItem('startTimes');
      if (startTimeString !== null) {
        const startTime = parseInt(startTimeString);
        const elapsed = new Date().getTime() - startTime;
        const hours = Math.floor(elapsed / (1000 * 60 * 60));
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
        setIsRunning(true);
        setIsStopwatchStart(true);
        AsyncStorage.removeItem('startTimes');
      }
    };

    retrieveStartTime();
  }, []);
  // useEffect(() => {
  //   data.forEach(val => {
  //     val.forEach(vall => {
  //       d2.push({
  //         startDate: vall.isApp.startDate + '-' + vall.isApp.endDate,
  //         status: vall.isApp.status !== 'SUBMIT' ? vall.isApp.status : '',
  //         weekHour: vall.isApp.weekHour,
  //       });
  //     });
  //   });

  //   data.forEach(val => {
  //     val.forEach(val => {
  //       val.head.forEach(val => {
  //         d1.push({
  //           header: val.header.day + ',' + val.header.month,
  //           hours: val.header.hours,
  //         });
  //       });
  //     });
  //   });

  //   data.forEach(val => {
  //     val.forEach(val => {
  //       val.head.forEach(val => {
  //         val.child.forEach(val => {
  //           d.push({
  //             task_description: val.task_description,
  //             project_name: val.project_name,
  //             tag_name: val.tag_name,
  //             task_start_time: val.task_start_time,
  //             task_end_time: val.task_end_time,
  //             task_created_datetime: val.task_created_datetime,
  //             task_total_time: val.task_total_time,
  //             date: val.date,
  //             task_child_id: val.task_child_id,
  //           });
  //         });
  //       });
  //     });
  //   });
  // }, [modalVisible, renderData]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     retrieveData();
  //   }, []),
  // );
  // const retrieveData = async () => {
  //   try {
  //     const storedResponse = await AsyncStorage.getItem('loginResponse');
  //     if (storedResponse !== null) {
  //       const loginResponse = JSON.parse(storedResponse);
  //       const uu = {employee_id: loginResponse[0].employee_id};
  //       const res = axios
  //         .post(
  //           'http://192.168.0.207:4178/api/timetracking/get/all/weeks/task/details/by/employeeid/list',
  //           uu,
  //         )
  //         .then(response => {
  //           const resdata = response.data.response.map(val => val);
  //           setdata(resdata);
  //           // val1.map(val => {
  //           //   d2.push({
  //           //     startDate: val.isApp.startDate + '-' + val.isApp.endDate,
  //           //     status: val.isApp.status,
  //           //     weekHour: val.isApp.weekHour,
  //           //   });
  //           // }),
  //         })

  //         .catch(error => {
  //           console.error(error);
  //         });

  //       // setdt({employee_id: loginResponse[0].employee_id});

  //       // Use the retrieved data in your screen
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log('headerjhsfgh', d1);
  // console.log('laskjdfh', d);
  // const deletecard = id => {
  //   dd = data.map(val1 => {
  //     val1.map(val2 => {
  //       val2.head.map(val3 => {
  //         val3.child.filter(val => {
  //           val.task_child_id !== id;
  //         });
  //       });
  //     });
  //   });
  // };

  const onPressStopwatch = () => {
    if (!isStopwatchStart) {
      setIsRunning(true);
    } else {
      if (workchild && currentValuechild) {
        let details = {
          task_description: workchild,
          project_id: 7630,
          employee_id: employee_id,
          task_start_time: currentTime.substring(0, 5),
          task_end_time: formattedTime.substring(0, 5),
          task_created_datetime: currentDate,
        };
        console.log(details);
        axios
          .post(`${baseurl}/api/timetracking/add/task/details/insert`, details)
          .then(
            response => console.log('------------->', response.data.response),
            setRenderData(true),
          )
          .catch(error => console.log(error));

        stopwatchTime =
          `${nhours}` < 10 && `${nminutes}` < 10 && `${nseconds}` < 10
            ? `0${nhours}:0${nminutes}:0${nseconds}`
            : `${nhours}:${nminutes}:${nseconds}`;
        console.log('>>>>>>>>>>>>>>>>>>', stopwatchTime);
        setStopwatchTime(stopwatchTime);
        setIsRunning(false);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        Adding();
      } else {
        Alert.alert(
          'Confirmation',
          'Do you want to continue?',
          [
            {
              text: 'No',
              onPress: () => {
                setSeconds(0);
                setMinutes(0);
                setHours(0);
                setIsRunning(false);
                setIsStopwatchStart(false);
              },
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => setIsStopwatchStart(true),
            },
          ],
          {cancelable: false},
        );
      }
    }
    setIsStopwatchStart(!isStopwatchStart);
  };

  const Items1 = [
    'Apigee',
    'BOB Finance Integration Platform',

    'Internal Attended',
    'Burger King',
    'Catholic Syrian Bank',
    'Certification',
    'City Union Banknging',
    'Client Holiday',
    'Desker',
    'Desynova -Aspera - Hourly',
    'Digital Marketing',
    'Dream Housie',
    'Euronet Sterling Gateway',
    'External Trainings',
    'Hawq-i',
    'Holiday',
    'Human Resource',
    'Indian Overseas bank',
    'Internal Meetings',
    'JANA Bank',
    'Karnataka Bank Ltd',
  ];
  // const saveCurrentDateToLocalStorage=async(()=>{
  //   let currentDates=
  //})

  const startOfWeek = moment(currentDate).startOf('week').format('MMMDoYYYY');
  const endOfWeek = moment(currentDate).endOf('week').format('MMMDoYYYY');
  const newTime = moment(currentTime, 'HH:mm:ss').format('HH:mm:ss');
  const [hours, minutes, seconds] = newTime.split(':').map(parseFloat);
  const milliseconds1 =
    hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  const milliseconds2 =
    nhours * 60 * 60 * 1000 + nminutes * 60 * 1000 + nseconds * 1000;
  let addedtime = milliseconds1 + milliseconds2;
  let seconds2 = Math.floor(addedtime / 1000);

  // Extract hours, minutes, and seconds
  let hours2 = Math.floor(seconds2 / 3600);
  seconds2 %= 3600;
  let minutes2 = Math.floor(seconds2 / 60);
  seconds2 %= 60;

  // Format hours, minutes, and seconds as strings with leading zeros
  let formattedHours = String(hours2).padStart(2, '0');
  let formattedMinutes = String(minutes2).padStart(2, '0');
  let formattedSeconds = String(seconds2).padStart(2, '0');

  // Combine hours, minutes, and seconds into a formatted time string
  let formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  function Adding() {
    let datach = Added1;
    if (workchild === '') {
      Alert.alert('please fill working details');
    } else if (currentValuechild === '') {
      Alert.alert('please fill project details');
    } else {
      datach.push({
        title: startOfWeek + '-' + endOfWeek,
        data: [
          workchild,
          currentValuechild,
          currentTime,
          formattedTime,
          currentDate,
          timetime,
        ],
      });
    }
    setAdded1(datach);
    setworkchild('');
    setCurrentValuechild('');
  }

  let renderItem = () =>
    data.map(val =>
      val.map(val1 => (
        <>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'black',
                marginBottom: 10,
              }}>
              <Text style={{color: '#fff'}}>
                {val1.isApp.startDate}-{val1.isApp.endDate}
              </Text>
              <Text style={{color: '#fff'}}>{val1.isApp.weekHour}</Text>
            </View>
            {val1.head.map(val2 => (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    marginBottom: 10,
                  }}>
                  <Text>
                    {val2.header.day}
                    {val2.header.month}
                  </Text>
                  <Text>{val2.header.hours}</Text>
                </View>
                {val2.child.map(val3 => (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: 'gray',
                      marginBottom: 10,
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <View style={{flex: 4}}>
                      <Text>Work Discription</Text>
                      <Text>Project Name</Text>
                      <Text>Start Time</Text>
                      <Text>End Time</Text>
                      <Text>Task created Date</Text>
                      <Text>Task Total Time</Text>
                    </View>
                    <View style={{flex: 2}}>
                      <Text style={{color: 'white'}}>:</Text>
                      <Text style={{color: 'white'}}>:</Text>
                      <Text style={{color: 'white'}}>:</Text>
                      <Text style={{color: 'white'}}>:</Text>
                      <Text style={{color: 'white'}}>:</Text>
                      <Text style={{color: 'white'}}>:</Text>
                    </View>
                    <View style={{flex: 4}}>
                      <Text>{val3.task_description}</Text>
                      <Text>{val3.project_name}</Text>
                      <Text>{val3.task_start_time}</Text>
                      <Text>{val3.task_end_time}</Text>
                      <Text>{val3.task_created_datetime}</Text>
                      <Text>{val3.task_total_time}</Text>
                    </View>
                  </View>
                ))}
              </>
            ))}
          </View>
        </>
      )),
    );
  useEffect(() => {
    renderItem();
    setRenderData(false);
  }, [modalVisible, renderData]);
  return (
    <View style={styles.container}>
      <View style={styles.drawerHeader}>
        <View style={{flex: 2, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={30} style={{}} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>TimeTracker</Text>
        </View>
        <Text style={styles.headerRight}></Text>
      </View>
      <View style={{flex: 3}}>
        <TextInput
          style={styles.Textinput}
          value={workchild}
          placeholder="What are you working on .  .  ."
          placeholderTextColor="#000000"
          onChangeText={val => {
            setworkchild(val);
          }}
        />

        <View style={styles.dropdownContainer}>
          <View style={{zIndex: 1}}>
            {/* <Dropdown
              style={styles.dropdown}
              items={Items1}
              open={isopen}
              setOpen={() => {
                setisopen(!isopen);
              }}
              setValue={val => {
                setCurrentValuechild(val);
              }}
              value={currentValuechild}
              placeholder="Project"
              placeholderStyle={{fontSize: 20}}
            /> */}
            <SelectDropdown
              buttonStyle={{
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 8,
              }}
              buttonTextAfterSelection={() =>
                currentValuechild ? currentValuechild : 'Select Project . . .'
              }
              data={Items1}
              onSelect={selectedItem => {
                setCurrentValuechild(selectedItem);
              }}
              onFocus={() => {
                setisdropdownopen(true);
              }}
              // showsVerticalScrollIndicator
              // search
              // searchInputStyle={{borderWidth: 2, borderRadius: 15, height: 45}}
              // searchPlaceHolder="Search hear . . . "
              renderDropdownIcon={() => (
                <Icons2
                  name={isdropdownopen ? 'expand-more' : 'expand-less'}
                  size={20}
                  color="black"
                />
              )}
              // renderSearchInputLeftIcon={() => {
              //   <Icons1
              //     name="search"
              //     size={70}
              //     color="black"
              //     alignItems="center"
              //   />;
              // }}
              // buttonTextAfterSelection={(selectedItem, index) => {
              //   // text represented after item is selected
              //   // if data array is an array of objects then return selectedItem.property to render after item is selected
              //   return selectedItem;
              // }}
              // rowTextForSelection={(item, index) => {
              //   // text represented for each item in dropdown
              //   // if data array is an array of objects then return item.property to represent item in dropdown
              //   return item;
              // }}
            />
          </View>

          <View style={{}}>
            {currentValuechild === '' ? (
              <Icons name="tago" size={50} color="black" style={styles.tag} />
            ) : currentValuechild.includes('Internal') ? (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  width: 100,
                  color: 'black',
                }}>
                Internal
              </Text>
            ) : (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'black',
                  width: 100,
                }}>
                External
              </Text>
            )}
          </View>
        </View>
        <View style={styles.sectionStyle}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 35,
              width: 150,
              alignSelf: 'center',
            }}>
            {nhours < 10 ? `0${nhours}` : nhours}:
            {nminutes < 10 ? `0${nminutes}` : nminutes}:
            {nseconds < 10 ? `0${nseconds}` : nseconds}
          </Text>
          <TouchableOpacity
            onPress={onPressStopwatch}
            style={{
              backgroundColor: isStopwatchStart ? 'red' : 'green',
              width: 100,
              borderWidth: 2,
              padding: 8,
              borderRadius: 8,
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>
              {isStopwatchStart ? 'Stop' : 'Start'}
            </Text>
          </TouchableOpacity>

          <TouchableHighlight
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.buttonTexts}>Add</Text>
          </TouchableHighlight>
          <Modal
            visible={modalVisible}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#000000aa',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  width: 350,
                  height: 350,
                  alignItems: 'center',
                  borderWidth: 2,
                }}>
                <TimeTracker1
                  setAdded={setAdded}
                  Added={Added}
                  setModalVisible={setModalVisible}
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View style={{flex: 7, zIndex: -1}}>
        {/* {Added.length > 0 ? (
          <SectionList
            sections={Added}
            renderItem={({item, title}) => (
              <View>
                <View
                  style={{
                    backgroundColor: 'black',
                  }}>
                  <Text style={{color: 'white'}}>{item}</Text>
                </View>
              </View>
            )}
            renderSectionHeader={({section: {title}}) => (
              <Text
                style={{
                  fontSize: 18,
                  backgroundColor: '#fff',
                  color: '#000000',
                }}>
                {title}
              </Text>
            )}
          />
        ) : null} */}
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="Black" />
          </View>
        ) : data ? (
          <FlatList
            data={[null]}
            keyExtractor={() => 'key'}
            renderItem={renderItem}
          />
        ) : (
          // data.map(val =>
          //   val.map(val1 => (
          //     <ScrollView>
          //       <View>
          //         <View
          //           style={{
          //             flexDirection: 'row',
          //             justifyContent: 'space-between',
          //             backgroundColor: 'black',
          //             marginBottom: 10,
          //           }}>
          //           <Text style={{color: '#fff'}}>
          //             {val1.isApp.startDate}-{val1.isApp.endDate}
          //           </Text>
          //           <Text style={{color: '#fff'}}>{val1.isApp.weekHour}</Text>
          //         </View>
          //         {val1.head.map(val2 => (
          //           <>
          //             <View
          //               style={{
          //                 flexDirection: 'row',
          //                 justifyContent: 'space-between',
          //                 backgroundColor: '#fff',
          //                 marginBottom: 10,
          //               }}>
          //               <Text>
          //                 {val2.header.day}
          //                 {val2.header.month}
          //               </Text>
          //               <Text>{val2.header.hours}</Text>
          //             </View>
          //             {val2.child.map(val3 => (
          //               <View
          //                 style={{
          //                   backgroundColor: 'gray',
          //                   marginBottom: 10,
          //                   padding: 10,
          //                   borderRadius: 10,
          //                 }}>
          //                 <Text>{val3.task_description}</Text>
          //                 <Text>{val3.project_name}</Text>
          //                 <Text>{val3.task_start_time}</Text>
          //                 <Text>{val3.task_end_time}</Text>
          //                 <Text>{val3.task_created_datetime}</Text>
          //                 <Text>{val3.task_total_time}</Text>
          //               </View>
          //             ))}
          //           </>
          //         ))}
          //       </View>
          //     </ScrollView>
          //   )),
          // )
          // <SectionList
          //   sections={Added1}
          //   renderItem={({item, title}) => (
          //     <View>
          //       <View
          //         style={{
          //           backgroundColor: 'black',
          //         }}>
          //         <Text style={{color: 'white'}}>{item}</Text>
          //       </View>
          //     </View>
          //   )}
          //   renderSectionHeader={({section: {title}}) => (
          //     <Text
          //       style={{
          //         fontSize: 18,
          //         backgroundColor: '#fff',
          //         color: '#000000',
          //       }}>
          //       {title}
          //     </Text>
          //   )}
          // />
          <Text></Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  drawerHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  headerTitle: {
    flex: 6,
    // paddingLeft: 60,
    alignItems: 'center',
  },
  headerRight: {
    flex: 2,
  },

  Textinput: {
    borderWidth: 2,
    height: 50,
    width: '100%',
    fontSize: 20,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10,
    color: 'black',
  },
  dropdownContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {},
  tag: {
    fontSize: 50,
    width: 100,
  },
  container1: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: -1,
  },
  buttonTexts: {
    fontSize: 18,
    borderWidth: 2,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    fontWeight: 'bold',
    color: 'black',
  },
});

const options = {
  container: {
    fontSize: 18,
    borderWidth: 2,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    width: 170,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
};

export default TimeTracker;
