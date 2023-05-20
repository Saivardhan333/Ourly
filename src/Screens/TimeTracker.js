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
  AppState,
  FlatList,
} from 'react-native';
import maindata from './data.json';
import moment from 'moment';
import Dropdown from 'react-native-dropdown-picker';
import Icons from 'react-native-vector-icons/AntDesign';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconsss from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TimeTracker1 from './TimeTracker1';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TimeTracker = props => {
  let stopwatchtime = '';
  const [workchild, setworkchild] = useState('');
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

  const currentDate = new Date().toLocaleDateString();
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
  const [data, setdata] = useState(maindata);
  const d = [];
  const d1 = [];
  const d2 = [];
  //const [timetime, settimetime] = useState();
  let timetime = '';
  useEffect(() => {
    let interval;
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

      AsyncStorage.setItem('startTimes', new Date().getTime().toString());
    }

    return () => {
      BackgroundTimer.clearInterval(interval);
    };
  }, [isRunning]);
  useEffect(() => {
    AsyncStorage.getItem('startTimes').then(startTimeString => {
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
    });
    // data.map(val => {
    //   val.map(val => {
    //     d2.push({
    //       startDate: val.isApp.startDate + '-' + val.isApp.endDate,
    //       status: val.isApp.status,
    //       weekHour: val.isApp.weekHour,
    //     });
    //   });
    // });
    // const responseData = data.map(val => {
    //   val.map(val => {
    //     val.head.map(val => {
    //       d1.push({
    //         header: val.header.day + ',' + val.header.month,
    //         hours: val.header.hours,
    //       });
    //       val.child.map(
    //         val =>
    //           d.push({
    //             task_description: val.task_description,
    //             project_name: val.project_name,
    //             tag_name: val.tag_name,
    //             task_start_time: val.task_start_time,
    //             task_end_time: val.task_end_time,
    //             task_created_datetime: val.task_created_datetime,
    //             task_total_time: val.task_total_time,
    //           }),
    //         //setchild({task_description: val.task_description}),
    //       );
    //     });
    //   });
    // });

    // const responseDataa = data.map(val => {
    //   val.map(val => {
    //     val.head.map(val =>
    //       val.child.map(
    //         val =>
    //           d.push({
    //             task_description: val.task_description,
    //             project_name: val.project_name,
    //             tag_name: val.tag_name,
    //             task_start_time: val.task_start_time,
    //             task_end_time: val.task_end_time,
    //             task_created_datetime: val.task_created_datetime,
    //             task_total_time: val.task_total_time,
    //           }),
    //         //setchild({task_description: val.task_description}),
    //       ),
    //     );
    //   });
    // });

    const ldata = {};
    maindata.map(val => {
      val.map(val => {
        val.head.map(val =>
          val.child.map(vall => {
            ldata.task_description = vall.task_description;
            ldata.project_id = 3433;
            ldata.employee_id = 982;
            ldata.task_start_time = vall.task_start_time;
            ldata.task_end_time = vall.task_end_time;
            ldata.task_created_datetime = vall.task_created_datetime;
          }),
        );
      });
    });
    console.log(
      'dagdagda',
      ldata.task_description,
      ldata.project_id,
      ldata.employee_id,
      ldata.task_start_time,
      ldata.task_end_time,
      ldata.task_created_datetime,
    );

    // const res = axios
    //   .post(
    //     'http://192.168.0.88:4178/api/timetracking/add/task/details/insert',
    //     ldata,
    //   )
    //   .then(response => {
    //     console.log('lalalalal', response.data);
    //   })
    //   .catch(error => {
    //     console.error('mmmmmmmmm', error);
    //   });
  }, []);

  data.map(val => {
    val.map(vall => {
      d2.push({
        startDate: vall.isApp.startDate + '-' + vall.isApp.endDate,
        status: vall.isApp.status,
        weekHour: vall.isApp.weekHour,
      });
    });
  });
  const responseData = data.map(val => {
    val.map(val => {
      val.head.map(val => {
        d1.push({
          header: val.header.day + ',' + val.header.month,
          hours: val.header.hours,
        });
      });
    });
  });
  const responseDataa = data.map(val => {
    val.map(val => {
      val.head.map(val => {
        val.child.map(
          val =>
            d.push({
              task_description: val.task_description,
              project_name: val.project_name,
              tag_name: val.tag_name,
              task_start_time: val.task_start_time,
              task_end_time: val.task_end_time,
              task_created_datetime: val.task_created_datetime,
              task_total_time: val.task_total_time,
              date: val.date,
              task_child_id: val.task_child_id,
            }),
          //setchild({task_description: val.task_description}),
        );
      });
    });
  });

  // console.log('headerjhsfgh', d1);
  // console.log('laskjdfh', d);
  const deletecard = id => {
    dd = data.map(val1 => {
      val1.map(val2 => {
        val2.head.map(val3 => {
          val3.child.filter(val => {
            val.task_child_id !== id;
          });
        });
      });
    });
  };

  const onPressStopwatch = () => {
    if (!isStopwatchStart) {
      setIsRunning(true);
    } else {
      if (workchild && currentValuechild) {
        setStopwatchTime(nhours + ':' + nminutes + ':' + nseconds);
        setIsRunning(false);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        Adding();
        setIsStopwatchStart(!isStopwatchStart);
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
    {label: 'Dancing', value: 'dancing'},
    {label: 'Playing', value: 'playing'},
    {label: 'Internal Attended', value: 'Internal Attended'},
    {label: 'Runing', value: 'Runing'},
    {label: 'roming', value: 'roming'},
    {label: 'romeo', value: 'romeo'},
    {label: 'Singing', value: 'singing'},
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
  //const [hours1, minutes1, seconds1] = stopWatchTime.split(':').map(parseFloat);
  const milliseconds2 =
    nhours * 60 * 60 * 1000 + nminutes * 60 * 1000 + nseconds * 1000;
  let addedtime = milliseconds1 + milliseconds2;
  let seconds2 = Math.floor(addedtime / 1000);

  // Extract hours, minutes and seconds
  let hours2 = Math.floor(seconds2 / 3600);
  seconds2 %= 3600;
  let minutes2 = Math.floor(seconds2 / 60);
  seconds2 %= 60;

  // Format hours, minutes and seconds as strings with leading zeros
  let formattedHours = String(hours2).padStart(2, '0');
  let formattedMinutes = String(minutes2).padStart(2, '0');
  let formattedSeconds = String(seconds2).padStart(2, '0');

  // Combine hours, minutes and seconds into formatted time string
  let formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  function Adding() {
    let datach = Added1;
    {
      workchild == ''
        ? Alert.alert('please fill working details')
        : currentValuechild == ''
        ? Alert.alert('please fill project details')
        : datach.push({
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
  return (
    <View style={styles.container}>
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
            <Dropdown
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
        {Added.length > 0 ? (
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
        ) : null}

        {Added1.length > 0 ? (
          <FlatList
            data={d2}
            renderItem={({item}) => (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#6c757d',
                    height: 30,
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 5,
                    padding: 5,

                    borderWidth: 2,
                  }}>
                  <Text style={{color: 'white'}}>{item.startDate}</Text>
                  <Text style={{color: 'white'}}>{item.status}</Text>
                  <Text style={{color: 'white'}}>{item.weekHour}</Text>
                </View>
                <FlatList
                  data={d1}
                  renderItem={({item}) => (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#adb5bd',
                          justifyContent: 'space-between',
                          height: 25,
                          alignItems: 'center',
                          borderRadius: 4,
                          padding: 4,
                          marginTop: 10,
                          borderWidth: 1.5,
                        }}>
                        <Text style={{color: 'black'}}>{item.header}</Text>
                        <Text style={{color: 'black'}}>{item.month}</Text>
                        <Text style={{color: 'black'}}>{item.hours}</Text>
                      </View>
                      <FlatList
                        data={d.filter(task => task.date.includes(item.header))}
                        renderItem={({item}) => (
                          <View
                            style={{
                              backgroundColor: '#ced4da',
                              justifyContent: 'space-between',
                              borderRadius: 10,
                              marginTop: 10,
                              padding: 10,
                              borderWidth: 1,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <View>
                                <Text style={{color: 'black'}}>
                                  {item.task_description}
                                </Text>
                                <Text style={{color: 'black'}}>
                                  {item.project_name}-----{item.tag_name}
                                </Text>
                                <Text style={{color: 'black'}}>
                                  {item.task_start_time}-{item.task_end_time}
                                </Text>
                                <Text style={{color: 'black'}}>
                                  {item.task_created_datetime}
                                </Text>
                                <Text style={{color: 'black'}}>
                                  {item.task_total_time}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',

                                  width: '35%',
                                }}>
                                <TouchableOpacity
                                  onPress={deletecard(item.task_child_id)}>
                                  <Iconss
                                    name="delete"
                                    size={20}
                                    color="black"
                                  />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => setModalVisible(true)}>
                                  <Iconsss
                                    name="edit"
                                    size={20}
                                    color="black"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  )}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
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

  Textinput: {
    borderWidth: 2,
    height: 50,
    width: '100%',
    fontSize: 20,
    borderRadius: 10,
    paddingLeft: 10,
    color: 'black',
  },
  dropdownContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {
    borderWidth: 2,
    height: 50,
    fontSize: 20,
    borderRadius: 10,
    width: 170,
  },
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
