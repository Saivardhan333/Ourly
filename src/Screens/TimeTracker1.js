import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  Button,
  Alert,
  Modal,
  FlatList,
  SectionList,
} from 'react-native';
import moment from 'moment';
import axios from 'axios';
import CustomNavbar from '../Components/CustomNavbar';
import {
  TextInput,
  TouchableOpacity,
  AppRegistry,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Dropdown from 'react-native-dropdown-picker';
import Icons from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {black} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import {scrollTo} from 'react-native-reanimated';
import SelectDropdown from 'react-native-select-dropdown';
import Icons2 from 'react-native-vector-icons/MaterialIcons';
LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  dayNamesShort: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
  today: 'Today',
};

LocaleConfig.defaultLocale = 'fr';
let success = 0;
const TimeTracker1 = ({setAdded, Added, setModalVisible}) => {
  const [working, setworking] = useState('');

  const [isopen, setisopen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [indate, setInDate] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [outdate, setOutDate] = useState(new Date());
  const [open2, setOpen2] = useState(false);
  const [intime, setintime] = useState();
  const [outtime, setouttime] = useState();
  const currentDate = new Date();
  const formatedDate = moment(currentDate).format('YYYY-MM-DD');
  const [selected, setSelected] = useState(formatedDate);

  const [showCalendar, setShowCalendar] = useState(false);
  // const [timerStart, setTimerStart] = useState(false);
  // const [stopwatchStart, setStopwatchStart] = useState(false);
  // const [timerReset, setTimerReset] = useState(false);
  // const [stopwatchReset, setStopwatchReset] = useState(false);
  // const [stopwatchshow, setstopwatchshow] = useState(false);
  const [newdate, setnewdate] = useState('');
  const [newdate2, setnewdate2] = useState('');
  // const [validated, setvalidated] = useState(false);
  const [hh1, sethh1] = useState('00');
  const [mm2, setmm2] = useState('00');
  const [ss3, setss3] = useState('00');
  const [dropdownopen, setdropdownopen] = useState(false);
  //const [hour, sethou] = useState(0);
  //const [minu, setmin] = useState(0);
  //const [totalDuration, setTotalDuration] = useState(90000);
  //const [startenddate, setstartenddate] = useState('');
  // const currentTime = useRef('');

  // const Items = [
  //   {label: 'Dancing', value: 'dancing'},
  //   {label: 'Playing', value: 'playing'},
  //   {label: 'Internal Attended', value: 'Internal Attended'},
  //   {label: 'Runing', value: 'Runing'},
  //   {label: 'roming', value: 'roming'},
  //   {label: 'romeo', value: 'romeo'},
  //   {label: 'Singing', value: 'singing'},
  // ];
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
  // const toggleTimer = () => {
  //   setTimerStart(!timerStart);
  //   setTimerReset(false);
  // };

  // const resetTimer = () => {
  //   setTimerStart(false);
  //   setTimerReset(true);
  // };

  // const toggleStopwatch = () => {
  //   setStopwatchStart(!stopwatchStart);
  //   setStopwatchReset(false);
  // };

  // const resetStopwatch = () => {
  //   setStopwatchStart(false);
  //   setStopwatchReset(true);
  // };

  // const handleTimerComplete = () => Alert.alert('custom completion function');

  // const getFormattedTime = time => {
  //   currentTime.current = time;
  // };
  // const timetrack = () => {};
  const options = {
    container: {
      fontSize: 18,
      borderWidth: 2,
      padding: 8,
      borderRadius: 8,
      backgroundColor: 'white',
      marginTop: 5,
      width: 170,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 5,
    },
  };
  let employeeid = 0;
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedResponse = await AsyncStorage.getItem('loginResponse');
        if (storedResponse !== null) {
          const loginResponse = JSON.parse(storedResponse);
          employeeid = {employee_id: loginResponse[0].employee_id};
        }
      } catch (error) {
        console.log(error);
      }
    };

    retrieveData();
  }, []);
  let otime = 0;
  function Adding() {
    const startOfWeek = moment(selected).startOf('week').format('MMMDoYYYY');
    const endOfWeek = moment(selected).endOf('week').format('MMMDoYYYY');
    let dataa = Added;
    if (working === '') {
      Alert.alert('please fill working details');
    } else if (currentValue === '') {
      Alert.alert('please fill Project details');
    } else if (intime === null) {
      Alert.alert('please fill InTime details');
    } else if (outtime === null) {
      Alert.alert('please fill OutTime details');
    } else {
      dataa.push({
        title: [startOfWeek + '-' + endOfWeek],
        data: [
          working,
          currentValue,
          intime,
          outtime,
          selected,
          hh1 + ':' + mm2 + ':' + ss3,
        ],
      });
      const details = {
        task_description: working,
        project_id: 6113,
        employee_id: employeeid,
        task_start_time: intime.substring(0, 5),
        task_end_time: outtime.substring(0, 5),
        task_created_datetime: selected,
      };
      axios
        .post(
          'http://192.168.0.207:4178/api/timetracking/add/task/details/insert',
          details,
        )
        .then(response => console.log(response.data.response))
        .catch(error => console.log(error));

      setModalVisible(false);
    }

    if (!working) {
      setworking('');
    } else if (!currentValue) {
      setCurrentValue('');
    } else if (!intime) {
      setintime('');
    } else if (outtime) {
      console.log('gagaggagagagag', outtime);
      setouttime('');
      setAdded(dataa);
    }
  }
  let time = 0;
  let time2 = 0;
  let minutes = 0;
  let minutes2 = 0;
  let hours = 0;
  let hours2 = 0;
  let hour = 0;
  let minu = 0;

  // useEffect(() => {
  //   // This code will run every time newdate or newdate2 changes

  //   if (newdate) {
  //     var date1 = new Date(newdate);

  //     var date2 = new Date(newdate2);
  //     var diff = date2.getTime() - date1.getTime();

  //     msec = diff;
  //     hh = Math.floor(msec / 1000 / 60 / 60);
  //     msec -= hh * 1000 * 60 * 60;
  //     mm = Math.floor(msec / 1000 / 60);
  //     msec -= mm * 1000 * 60;
  //     ss = Math.floor(msec / 1000);
  //     msec -= ss * 1000;
  //     sethh1(hh.toString().padStart(2, '0'));
  //     setmm2(mm.toString().padStart(2, '0'));
  //     setss3(ss.toString().padStart(2, '0'));

  //     setShowCalendar(false);
  //   } else {
  //     Alert.alert('please enter intime first');
  //   }
  // }, [newdate2]);

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <TextInput
          style={styles.Textinput}
          value={working}
          placeholder="What are you working on .  .  ."
          placeholderTextColor="#000000"
          onChangeText={val => {
            setworking(val);
          }}
        />
        <View style={styles.dropdownContainer}>
          <View style={{zIndex: 1}}>
            {/* <Dropdown
              style={styles.dropdown}
              items={Items}
              open={isopen}
              setOpen={() => {
                setisopen(!isopen);
              }}
              setValue={val => {
                setCurrentValue(val);
              }}
              value={currentValue}
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
                currentValue ? currentValue : 'Select Project . . .'
              }
              data={Items1}
              onSelect={selectedItem => {
                setCurrentValue(selectedItem);
              }}
              onFocus={() => {
                setdropdownopen(true);
              }}
              // showsVerticalScrollIndicator
              // search
              // searchInputStyle={{borderWidth: 2, borderRadius: 15, height: 45}}
              // searchPlaceHolder="Search hear . . . "
              renderDropdownIcon={() => (
                <Icons2
                  name={dropdownopen ? 'expand-more' : 'expand-less'}
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
            {currentValue === '' ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icons
                  name="tago"
                  size={50}
                  color="black"
                  alignItems="center"
                  style={styles.tag}
                />
              </View>
            ) : currentValue.includes('Internal') ? (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginTop: 20,
                  color: 'black',
                  width: 150,
                  paddingLeft: 40,
                }}>
                Internal
              </Text>
            ) : (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginTop: 20,
                  color: 'black',
                  width: 150,
                  paddingLeft: 40,
                }}>
                External
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            zIndex: -1,
            marginTop: -15,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              width: 150,
              padding: 8,
              borderRadius: 8,
              backgroundColor: 'white',
            }}
            onPress={() => setOpen1(true)}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                alignSelf: 'center',
              }}>
              {intime ? (
                <Text style={{color: 'black'}}>{intime}</Text>
              ) : (
                <Text style={{color: 'black'}}>In-Time</Text>
              )}
            </Text>
            <DatePicker
              modal
              open={open1}
              date={indate}
              mode="time"
              onConfirm={date => {
                setOpen1(false);
                setInDate(date);
                hours = date.getHours();
                minutes = date.getMinutes();
                {
                  minutes <= 9 ? (minutes = '0' + minutes) : minutes;
                }
                hours >= 12
                  ? (time = hours + ':' + minutes + ':' + '00')
                  : (time = hours + ':' + minutes + ':' + '00');

                setintime(time);
              }}
              onCancel={() => {
                setOpen1(false);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              width: 150,
              padding: 8,
              borderRadius: 8,
              backgroundColor: 'white',
              marginLeft: 10,
            }}
            onPress={() => setOpen2(true)}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                alignSelf: 'center',
              }}>
              {outtime ? (
                <Text style={{color: 'black'}}> {outtime}</Text>
              ) : (
                <Text style={{color: 'black'}}>Out-Time</Text>
              )}
            </Text>
            <DatePicker
              modal
              open={open2}
              date={outdate}
              mode="time"
              onConfirm={date => {
                hh = 1;
                setOpen2(false);
                setOutDate(date);

                hours2 = date.getHours();
                minutes2 = date.getMinutes();
                {
                  minutes2 <= 9
                    ? minutes2 > 0
                      ? (minutes2 = '0' + minutes2)
                      : Alert.alert('data should not be null')
                    : minutes2;
                }
                hours2 >= 12
                  ? (time2 = hours2 + ':' + minutes2 + ':' + '00')
                  : (time2 = hours2 + ':' + minutes2 + ':' + '00');

                if (intime) {
                  setouttime(time2);
                  otime = time2;
                  {
                    hours2 > hours
                      ? (setouttime(time2), (otime = time2))
                      : hours2 == hours
                      ? minutes2 > minutes
                        ? Alert.alert('please enter valid data')
                        : Alert.alert('please enter valid data')
                      : Alert.alert('please enter valid data');
                  }
                  let setindatetime = formatedDate + ' ' + intime;
                  let setoutdatetime = formatedDate + ' ' + otime;
                  setnewdate(setindatetime);
                  setnewdate2(setoutdatetime);
                  var date1 = new Date(setindatetime);

                  var date2 = new Date(setoutdatetime);
                  var diff = date2.getTime() - date1.getTime();

                  msec = diff;
                  hh = Math.floor(msec / 1000 / 60 / 60);
                  msec -= hh * 1000 * 60 * 60;
                  mm = Math.floor(msec / 1000 / 60);
                  msec -= mm * 1000 * 60;
                  ss = Math.floor(msec / 1000);
                  msec -= ss * 1000;
                  sethh1(hh.toString().padStart(2, '0'));
                  setmm2(mm.toString().padStart(2, '0'));
                  setss3(ss.toString().padStart(2, '0'));

                  setShowCalendar(false);
                } else {
                  Alert.alert('please enter intime first');
                }
              }}
              onCancel={() => {
                setOpen1(false);
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            zIndex: -1,
          }}>
          <TouchableOpacity
            onPress={() => setShowCalendar(true)}
            style={{
              borderWidth: 2,
              padding: 8,
              width: 150,
              height: 50,
              borderRadius: 8,
              backgroundColor: 'white',
              marginTop: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {selected ? (
                <Text style={{color: 'black'}}> {selected}</Text>
              ) : (
                <Text style={{color: 'black'}}>
                  {setSelected(formatedDate)}
                </Text>
              )}
              <Modal visible={showCalendar}>
                <View
                  style={{
                    backgroundColor: '#000000aa',
                    flex: 1,
                  }}>
                  <View style={{flex: 2}}></View>
                  <View style={{flex: 6}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View>
                        <Calendar
                          onDayPress={day => {
                            setSelected(day.dateString);
                            setShowCalendar(false);
                          }}
                          markedDates={{
                            [selected]: {
                              selected: true,
                              disableTouchEvent: true,
                              selectedDotColor: 'orange',
                            },
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{flex: 2}}></View>
                </View>
              </Modal>
            </Text>
          </TouchableOpacity>
          <TextInput
            style={{
              borderWidth: 2,
              padding: 8,
              width: 150,
              borderRadius: 8,
              backgroundColor: 'white',
              marginTop: 5,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {hh1}:{mm2}:{ss3}
            </Text>
          </TextInput>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: -10,
            justifyContent: 'space-around',
            zIndex: -1,
          }}>
          {/* {
              <TouchableHighlight
                onPress={toggleStopwatch}
                style={{
                  backgroundColor: 'white',
                  borderWidth: 2,
                  borderRadius: 10,
                  width: 70,
                  paddingLeft: 5,
                }}>
                <Text style={{fontSize: 25}}>
                  {!stopwatchStart ? 'Start' : 'Stop'}
                </Text>
              </TouchableHighlight>
            } */}
          <TouchableHighlight
            style={{
              backgroundColor: 'white',
              borderWidth: 2,
              borderRadius: 10,
              width: 90,
              height: 50,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 25, color: 'black'}}>Reset</Text>
          </TouchableHighlight>
          <TouchableOpacity
            onPress={() => {
              Adding();
            }}
            style={{
              backgroundColor: 'white',
              borderWidth: 2,
              borderRadius: 10,
              width: 60,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                color: 'black',
              }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              width: 150,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              marginBottom: 10,
              alignSelf: 'center',
            }}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#fff',
                fontWeight: '800',
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 5,
  },
  //screen: {
  //  flex: 5,
  //},
  Textinput: {
    borderWidth: 2,
    height: 50,
    width: '100%',
    fontSize: 20,
    borderRadius: 10,
    marginTop: 8,
    color: 'black',
  },
  dropdownContainer: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    borderWidth: 2,
    height: 50,
    fontSize: 20,
    borderRadius: 10,
    width: 150,
  },
  tag: {
    fontSize: 50,
    width: 150,
  },
});

export default TimeTracker1;
