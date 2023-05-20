import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import DateRangePickers from 'react-native-daterange-picker';
import moment from 'moment';
import Icons from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';

const TimeSheet = () => {
  const [projectData, setProjectData] = useState([]);
  const [project, setproject] = useState([]);
  const [startofweek, setstartofweek] = useState();
  const [endofweek, setendofweek] = useState();
  const [loading, setLoading] = useState(true);
  const abc = {
    first_week_day: startofweek,
    last_week_day: endofweek,
    employee_id: 2660,
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        'http://192.168.0.207:4178/api/timesheet/get/projects/overview/each/week',
        abc,
      )
      .then(response => {
        //setProjectData(response.data);
        const updatedProject = response.data.response.map(val => ({
          project_name: val.project_name,
          monday: val.monday,
          tuesday: val.tuesday,
          wednesday: val.wednesday,
          thursday: val.thursday,
          friday: val.friday,
          saturday: val.saturday,
          sunday: val.sunday,
          total_hour: val.total_hour,
        }));
        setproject(updatedProject);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        // Handle the error here
      });
  }, [startofweek, endofweek]);

  const currentDates = moment();
  const [value, setValue] = useState(moment());
  const [startDate, setStartDate] = useState(
    currentDates.startOf('isoWeek').toDate(),
  );
  const [endDate, setEndDate] = useState(
    currentDates.startOf('isoWeek').toDate(),
  );
  const [weekdata, setweekdata] = useState(false);
  const [displayedDates, setDisplayedDate] = useState(currentDates);
  useEffect(() => {
    const weekDates = getweekdays(value);
    setstartofweek(moment(weekDates[0]).format('YYYY-MM-DD'));
    setendofweek(moment(weekDates[1]).format('YYYY-MM-DD'));
    setStartDate(weekDates[0]);
    setEndDate(weekDates[1]);
  }, [value]);
  console.log(startofweek, endofweek);
  const setDates = (dates, displayedDates) => {
    if (dates.startDate) {
      console.log(dates.startDate.format('YYYY-MM-DD'));
      setValue(dates.startDate.format('YYYY-MM-DD'));
      setweekdata(true);
    } else if (dates.endDate) {
      console.log(dates.endDate.format('YYYY-MM-DD'));
      setValue(dates.endDate.format('YYYY-MM-DD')); // Update the value as needed when no start date is selected
    }
    if (dates.displayedDate) {
      setweekdata(true);
      if (
        parseInt(dates.displayedDate.format('MM')) <
        parseInt(displayedDates.format('MM'))
      ) {
        const previousMonth = moment(displayedDates).subtract(1, 'month');
        setDisplayedDate(previousMonth);
        setValue(previousMonth);
      } else if (
        parseFloat(dates.displayedDate.format('MM')) >
        parseFloat(displayedDates.format('MM'))
      ) {
        const nextMonth = moment(displayedDates).add(1, 'month');
        setDisplayedDate(nextMonth);
        setValue(nextMonth);
      }
    }

    // console.log(
    //   'llllllllll',
    //   parseFloat(dates.displayedDate.format('MM')) <
    //     parseFloat(displayedDate.format('MM')),
    // );
  };
  // const weekaa = getweekdays(value);
  // setStartDate(weekaa[0]);
  // setEndDate(weekaa[1]);
  // useEffect(() => {
  //   startOfWeek = moment().startOf('week');
  //   endOfWeek = moment().endOf('week');
  //   setStartDate(startOfWeek);
  //   setEndDate(endOfWeek);
  // }, []);
  function getweekdays(val) {
    const moment = require('moment');
    console.log('valuee', val);
    // Assuming you have a selectedDate variable representing the chosen date from the calendar
    const selectedDate = moment(val); // Example date, replace with your selected date

    // Set Monday as the start of the week
    moment.updateLocale('en', {
      week: {
        dow: 1, // Monday is the start of the week
      },
    });

    // Get the start of the current week (Monday)
    const startOfWeek = selectedDate.startOf('isoWeek').add(0, 'days').toDate();

    // Get the end of the current week (Sunday)
    const endOfWeek = selectedDate.startOf('isoWeek').add(6, 'days').toDate();

    // Push the start and end dates of the week into an array
    const week = [];
    week.push(startOfWeek);
    week.push(endOfWeek);
    return week;
  }
  // const handlePreviousMonth = () => {
  //   const previousMonth = moment(displayedDate).subtract(1, 'month');
  //   setDisplayedDate(previousMonth);
  //   setValue(previousMonth);
  // };
  // const handleNextMonth = () => {
  //   const nextMonth = moment(displayedDate).add(1, 'month');
  //   setDisplayedDate(nextMonth);
  //   setValue(nextMonth);
  // };

  return (
    <>
      <View style={styles.screen}>
        <DateRangePickers
          onChange={val => {
            setDates(val, displayedDates);
          }}
          endDate={endDate}
          startDate={startDate}
          displayedDate={displayedDates}
          range>
          <Text
            style={{
              color: 'black',
              borderWidth: 2,
              fontSize: 21,
              height: 40,
              width: 250,
              borderRadius: 5,
              paddingTop: 5,
              paddingLeft: 20,
              marginTop: 10,
            }}>
            {moment(startDate).format('YYYY-MM-DD')} _{' '}
            {moment(endDate).format('YYYY-MM-DD')}
          </Text>
        </DateRangePickers>
        <TouchableOpacity
          style={{marginTop: 15}}
          onPress={() => {
            const previousWeek = moment(value).subtract(7, 'days');
            setValue(previousWeek);
            const weekDates = getweekdays(previousWeek);
            setStartDate(weekDates[0]);
            setEndDate(weekDates[1]);
          }}>
          <Icons
            name="left"
            size={25}
            color="black"
            style={{paddingLeft: 10}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginTop: 15}}
          onPress={() => {
            const postWeek = moment(value).add(7, 'days');
            setValue(postWeek);
            const weekDates = getweekdays(postWeek);
            setStartDate(weekDates[0]);
            setEndDate(weekDates[1]);

            // let currentDate = moment(value).add(6, 'days');
            // let weekStart = currentDate.endOf('week');
            // console.log('sjdfhgdkhbzzzzzzzzzzzzzzzzzzzzzzzzzz', weekStart);
            // setValue(moment(value).add(7, 'days'));

            // let days = [];
            // days.push(moment(weekStart).add(1, 'days').format('YYYY-MM-DD'));
            // days.push(moment(weekStart).add(7, 'days').format('YYYY-MM-DD'));
          }}>
          <Icons
            name="right"
            size={25}
            color="black"
            style={{paddingLeft: 10}}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="Black" />
        </View>
      ) : (
        <View>
          <FlatList
            data={project}
            renderItem={({item, index}) => (
              <View
                style={{
                  backgroundColor: 'black',
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 20,
                  flexDirection: 'row',
                  margin: 10,
                  zIndex: -1,
                }}>
                <View
                  style={{
                    flex: 4,
                  }}>
                  {item.project_name != null ? (
                    <Text style={{color: 'white', backgroundColor: 'gray'}}>
                      project_name
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: 'white',
                        backgroundColor: 'gray',
                      }}>
                      Total_hours
                    </Text>
                  )}
                  <Text style={{color: 'white'}}>Monday</Text>
                  <Text style={{color: 'white'}}>Tuesday</Text>
                  <Text style={{color: 'white'}}>Wednesday</Text>
                  <Text style={{color: 'white'}}>Thursday</Text>
                  <Text style={{color: 'white'}}>Friday</Text>
                  <Text style={{color: 'white'}}>Saturday</Text>
                  <Text style={{color: 'white'}}>Sunday</Text>
                  <Text style={{color: 'white'}}>total_hour</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}></Text>
                  <Text style={{color: 'white'}}>:</Text>
                  <Text style={{color: 'white'}}>:</Text>
                  <Text style={{color: 'white'}}>: </Text>
                  <Text style={{color: 'white'}}>:</Text>
                  <Text style={{color: 'white'}}>:</Text>
                  <Text style={{color: 'white'}}>:</Text>
                  <Text style={{color: 'white'}}>:</Text>
                  <Text style={{color: 'white'}}>:</Text>
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', backgroundColor: 'gray'}}>
                    {item.project_name}
                  </Text>
                  <Text style={{color: 'white'}}>{item.monday}</Text>
                  <Text style={{color: 'white'}}>{item.tuesday}</Text>
                  <Text style={{color: 'white'}}>{item.wednesday}</Text>
                  <Text style={{color: 'white'}}>{item.thursday}</Text>
                  <Text style={{color: 'white'}}>{item.friday}</Text>
                  <Text style={{color: 'white'}}>{item.saturday}</Text>
                  <Text style={{color: 'white'}}>{item.sunday}</Text>
                  <Text style={{color: 'white'}}>{item.total_hour}</Text>
                </View>
              </View>
            )}
            ListFooterComponent={<View style={{height: 50}} />}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
});
export default TimeSheet;
