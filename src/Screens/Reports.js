import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {PieChart} from 'react-native-gifted-charts';
import {BarChart} from 'react-native-gifted-charts';
import {baseurl} from '../utils/urls';
import moment from 'moment';
import Icons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import DateRangePickers from 'react-native-daterange-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {StackedBarChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Reports = () => {
  const navigation = useNavigation();
  const currentDates = moment();
  const [project, setproject] = useState([]);
  const [startofweek, setstartofweek] = useState();
  const [graphdata1, setgraphdata] = useState();
  const [employeeid, setemployeeid] = useState();
  const [endofweek, setendofweek] = useState();
  const [loading, setLoading] = useState(true);
  const [submit, setsubmit] = useState(true);
  const [submitData, setsubmitData] = useState(false);
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
  //console.log(startofweek, endofweek);
  const setDates = (dates, displayedDates) => {
    if (dates.startDate) {
      // console.log(dates.startDate.format('YYYY-MM-DD'));
      setValue(dates.startDate.format('YYYY-MM-DD'));
      setweekdata(true);
    } else if (dates.endDate) {
      //console.log(dates.endDate.format('YYYY-MM-DD'));
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
  useEffect(() => {
    retrieveData();
  }, []);
  useEffect(() => {
    console.log('Done done done111112222. . .', employeeid);
    retrieveData();
  }, [startofweek, endofweek]);
  const retrieveData = async () => {
    try {
      const storedResponse = await AsyncStorage.getItem('loginResponse');
      if (storedResponse !== null) {
        const loginResponse = JSON.parse(storedResponse);
        setemployeeid(loginResponse[0]?.employee_id);
        const weekDates = getweekdays(value);
        const abc = {
          start_date: moment(weekDates[0]).format('YYYY-MM-DD'),
          end_date: moment(weekDates[1]).format('YYYY-MM-DD'),
          employee_id: loginResponse[0]?.employee_id,
          role_id: 6435,
        };
        // Use the retrieved data in your screen
        console.log('<<a>>b>>c>>', abc);
        graphdataa(abc);
      }
    } catch (error) {
      console.log(error);
    }
  };
  function graphdataa(abc) {
    console.log('gggggggggggggggggg');
    console.log('????????????????>', abc);
    axios
      .post(`${baseurl}/api/analyze/get/dashboad/overview`, abc)
      .then(response => {
        console.log('<<<<<<<<<>>>>>>>>>>>>>>>..,', response?.data?.response);
        // let data = [...response.data];
        setgraphdata(response.data);
        let arr = response?.data?.response[1][0].value.map(val => val);
        console.log('arrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', arr);
        let pieData1;
        if (arr.length > 0) {
          pieData1 = arr?.map(obj => ({
            value: parseInt(obj?.total_time?.split(':')[0]),
            color: obj?.project_color_code,
          }));
        }
        console.log('><<<<<<<<<<<<<<<<<<<<<<>', pieData1);
      })
      .catch(error => console.log('data has been set errro'));
  }
  // useEffect(() => {
  //   retrieveData;
  //   setLoading(true);
  //   axios
  //     .post(
  //       'http://192.168.0.207:4178/api/timesheet/get/projects/overview/each/week',
  //       abc,
  //     )
  //     .then(response => {
  //       //    console.log('pppppppppppppppp', response.data.response);
  //       //setProjectData(response.data);
  //       // const updatedProject = response.data.response.map(val => ({
  //       //   project_name: val.project_name,
  //       //   monday: val.monday,
  //       //   tuesday: val.tuesday,
  //       //   wednesday: val.wednesday,
  //       //   thursday: val.thursday,
  //       //   friday: val.friday,
  //       //   saturday: val.saturday,
  //       //   sunday: val.sunday,
  //       //   total_hour: val.total_hour,
  //       // }));
  //       // setproject(updatedProject);

  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setLoading(false);
  //       // Handle the error here
  //     });
  // }, [startofweek, endofweek]);
  function getweekdays(val) {
    const moment = require('moment');
    //  console.log('valuee', val);
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
  // console.log('}}}}}}}}}', startofweek, endofweek);
  const startweekdate = new Date(startofweek);
  const endingweekdate = new Date(endofweek);

  const middleDates = [];

  // Include the start date
  middleDates.push(startofweek);

  // Calculate the middle dates
  const current = new Date(startweekdate);
  current.setDate(current.getDate() + 1); // Increment current date by 1
  // console.log(
  //   '===================)',
  //   endingweekdate.toISOString().slice(0, 10),
  // );
  while (current < endingweekdate) {
    middleDates.push(current.toISOString().slice(0, 10)); // Add current date to the array
    current.setDate(current.getDate() + 1); // Increment current date by 1
  }
  // middleDates.push(endingweekdate.toISOString().slice(0, 10));
  console.log('>>>>>>>>>>..', middleDates);
  // Include the end date
  // middleDates.push(endingweekdate.toISOString().slice(0, 10));
  // console.log(']]]]]]]]]]]]]', middleDates);
  const pieData = [
    {value: 70, color: '#d63384'},
    {value: 10, color: '#fff'},
    {value: 10, color: 'black'},
    {value: 10, color: 'red'},
  ];

  // const body = {
  //   employee_id: 9968,
  //   end_date: '2023-05-28',
  //   start_date: '2023-05-22',
  // };
  const staticData = [
    {
      project_id: 5771,
      project_name: 'Internal Attended Training',
      project_color_code: 'rgb(217, 26, 118)',
      client_id: 17,
      client_name: 'Pronteff',
      task_description:
        'Working On Ourly Mobile App (Holidays List with Static Data)',
      task_total_time: '03:36:00',
    },
    {
      project_id: 5771,
      project_name: 'Internal Attended Training',
      project_color_code: 'rgb(217, 26, 118)',
      client_id: 17,
      client_name: 'Pronteff',
      task_description: 'Working On Ourly Mobile App Date Range Picker Api',
      task_total_time: '03:37:00',
    },
    {
      project_id: 5771,
      project_name: 'Internal Attended Training',
      project_color_code: 'rgb(217, 26, 118)',
      client_id: 17,
      client_name: 'Pronteff',
      task_description: 'Working On Ourly Mobile App Date Range Picker Api',
      task_total_time: '03:30:00',
    },
    {
      project_id: 5771,
      project_name: 'Internal Attended Training',
      project_color_code: 'rgb(217, 26, 118)',
      client_id: 17,
      client_name: 'Pronteff',
      task_description: 'Working On Ourly Mobile App Date Range Picker Api',
      task_total_time: '01:30:00',
    },
    {
      project_id: 5771,
      project_name: 'Internal Attended Training',
      project_color_code: 'rgb(217, 26, 118)',
      client_id: 17,
      client_name: 'Pronteff',
      task_description:
        'Working On Ourly Mobile App Dynamic Timesheet API Integration',
      task_total_time: '03:35:00',
    },
    {
      project_id: 5771,
      project_name: 'Internal Attended Training',
      project_color_code: 'rgb(217, 26, 118)',
      client_id: 17,
      client_name: 'Pronteff',
      task_description:
        'Working On Ourly Mobile App Dynamic Timesheet API Integration',
      task_total_time: '03:30:00',
    },
    {
      project_id: 5771,
      project_name: 'Internal Attended Training',
      project_color_code: 'rgb(217, 26, 118)',
      client_id: 17,
      client_name: 'Pronteff',
      task_description:
        'Working On Ourly Mobile App Dynamic Timesheet API Integration',
      task_total_time: '01:45:00',
    },
    {
      project_id: 5771,
      project_name: 'Internal Attended Training',
      project_color_code: 'rgb(217, 26, 118)',
      client_id: 17,
      client_name: 'Pronteff',
      task_description:
        'Working On Ourly Mobile App Forgot Password Api Integration',
      task_total_time: '03:30:00',
    },
    {
      project_id: 5771,
      project_name: 'Internal Attended Training',
      project_color_code: 'rgb(217, 26, 118)',
      client_id: 17,
      client_name: 'Pronteff',
      task_description:
        'Working On Ourly Mobile App Forgot Password Api Integration',
      task_total_time: '01:20:00',
    },
    {
      project_id: 5771,
      project_name: 'Internal Attended Training',
      project_color_code: 'rgb(217, 26, 118)',
      client_id: 17,
      client_name: 'Pronteff',
      task_description: 'Working On Ourly Mobile App Log In Api ',
      task_total_time: '03:35:00',
    },
  ];
  const graphdata = {
    status: 200,
    time: '2023-6-1 10:34:18',
    response: [
      {
        total_time: '15:50:00',
        top_project: {
          project_id: 7936,
          project_name: 'Desker',
          project_color_code: 'rgb(160, 7, 232)',
          project_code: 'DESCON01EXT',
          client_id: 12,
          client_name: 'Grene',
          tag_id: 2,
          tag_name: 'External',
          total_time: '11:40:00',
          total_milliseconds: 42000000,
        },
      },
      [
        {
          project_name: 'Desker',
          value: [
            {
              project_name: 'Desker',
              project_color_code: 'rgb(160, 7, 232)',
              project_code: 'DESCON01EXT',
              client_id: 12,
              client_name: 'Grene',
              tag_id: 2,
              tag_name: 'External',
              total_time: '03:10:00',
              task_created_datetime: '2023-06-05',
            },
            {
              project_name: 'Desker',
              project_color_code: 'rgb(160, 7, 232)',
              project_code: 'DESCON01EXT',
              client_id: 12,
              client_name: 'Grene',
              tag_id: 2,
              tag_name: 'External',
              total_time: '08:30:00',
              task_created_datetime: '2023-06-06',
            },
          ],
        },
        {
          project_name: 'Ourly',
          value: [
            {
              project_name: 'Ourly',
              project_color_code: 'rgb(211, 241, 25)',
              project_code: 'OURPRJ01INT',
              client_id: 17,
              client_name: 'Pronteff',
              tag_id: 1,
              tag_name: 'Internal',
              total_time: '03:10:00',
              task_created_datetime: '2023-06-06',
            },
            {
              project_name: 'Ourly',
              project_color_code: 'rgb(211, 241, 25)',
              project_code: 'OURPRJ01INT',
              client_id: 17,
              client_name: 'Pronteff',
              tag_id: 1,
              tag_name: 'Internal',
              total_time: '01:00:00',
              task_created_datetime: '2023-06-05',
            },
          ],
        },
        {
          project_name: 'Burger King',
          value: [
            {
              project_name: 'Desker',
              project_color_code: 'red',
              project_code: 'DESCON01EXT',
              client_id: 12,
              client_name: 'Grene',
              tag_id: 2,
              tag_name: 'External',
              total_time: '03:10:00',
              task_created_datetime: '2023-06-07',
            },
            {
              project_name: 'Desker',
              project_color_code: 'red',
              project_code: 'DESCON01EXT',
              client_id: 12,
              client_name: 'Grene',
              tag_id: 2,
              tag_name: 'External',
              total_time: '08:30:00',
              task_created_datetime: '2023-06-05',
            },
          ],
        },
        {
          project_name: 'Apigee',
          value: [
            {
              project_name: 'Apigee',
              project_color_code: 'green',
              project_code: 'DESCON01EXT',
              client_id: 12,
              client_name: 'Grene',
              tag_id: 2,
              tag_name: 'External',
              total_time: '03:10:00',
              task_created_datetime: '2023-06-05',
            },
            {
              project_name: 'Apigee',
              project_color_code: 'green',
              project_code: 'DESCON01EXT',
              client_id: 12,
              client_name: 'Grene',
              tag_id: 2,
              tag_name: 'External',
              total_time: '08:30:00',
              task_created_datetime: '2023-06-06',
            },
          ],
        },
      ],
      [
        {
          task_created_datetime: '2023-05-29',
          total_time: '04:10:00',
        },
        {
          task_created_datetime: '2023-05-30',
          total_time: '03:10:00',
        },
        {
          task_created_datetime: '2023-05-31',
          total_time: '08:30:00',
        },
      ],
      [
        {
          project_id: 7936,
          project_name: 'Desker',
          project_color_code: 'rgb(160, 7, 232)',
          project_code: 'DESCON01EXT',
          client_id: 12,
          client_name: 'Grene',
          tag_id: 2,
          tag_name: 'External',
          total_time: '11:40:00',
        },
        {
          project_id: 1372,
          project_name: 'Ourly',
          project_color_code: 'rgb(211, 241, 25)',
          project_code: 'OURPRJ01INT',
          client_id: 17,
          client_name: 'Pronteff',
          tag_id: 1,
          tag_name: 'Internal',
          total_time: '04:10:00',
        },
      ],
    ],
  };

  // const stackDataa = [];
  // for (let j = 0; j < graphdata.response[1].length; j++) {
  //   const valueArray = graphdata.response[1][j].value;
  //   const stackData = [];

  //   for (let i = 0; i < valueArray.length; i++) {
  //     const timeString = valueArray[i].total_time;
  //     const timeParts = timeString.split(':');
  //     const hours = parseInt(timeParts[0]);
  //     const minutes = parseInt(timeParts[1]);
  //     const seconds = parseInt(timeParts[2]);
  //     const decimalHours = hours + minutes / 60 + seconds / 3600;
  //     const value = decimalHours.toFixed(1);
  //     const color = valueArray[i].project_color_code;
  //     for (let k = 0; k <= middleDates.length; k++) {
  //       if (middleDates[k] == valueArray[i].task_created_datetime) {
  //         stackData.push({value, color});
  //         const label = middleDates[j];
  //         stackDataa.push({stacks: stackData, label});
  //       }
  //     }
  //   }
  // }
  let ff = [];
  let pieDataa = [];
  // const barData = [
  //   {value: 2.5, label: middleDates[0], frontColor: '#07bc0c'},
  //   {value: 1.5, label: middleDates[1], frontColor: '#07bc0c'},
  //   {value: 1.5, label: middleDates[2], frontColor: '#07bc0c'},
  //   {value: 2.5, label: middleDates[3], frontColor: '#07bc0c'},
  //   {value: 3.5, label: middleDates[4], frontColor: '#07bc0c'},
  //   {value: 3.5, label: middleDates[5], frontColor: '#07bc0c'},
  //   {value: 3.5, label: middleDates[6], frontColor: '#07bc0c'},
  // ];
  const ssArray = middleDates?.map(val => datafun(val));
  function datafun(data) {
    const dataa = graphdata1?.response[1];
    const res = dataa?.map(val =>
      val?.value?.filter(pro => pro?.task_created_datetime === data),
    );
    let uniqueData = new Set();
    res?.forEach(items => {
      let formattedHours = 0;
      items?.forEach(item => {
        const timeParts = item?.total_time?.split(':');
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const seconds = parseInt(timeParts[2]);
        const decimalHours = hours + minutes / 60 + seconds / 3600;
        formattedHours = decimalHours.toFixed(1);

        pieDataa?.push({
          value: parseFloat(formattedHours),
          color: item.project_color_code,
        });
      });
      if (!uniqueData.has(data)) {
        ff?.push({
          value: parseFloat(formattedHours),
          label: data,
          frontColor: '#8dc572',
        });

        uniqueData?.add(data); // Add the data to the set
      }
    });
  }
  //const totalValue = pieDataa.reduce((sum, data) => sum + data.value, 0);
  const aggregatedData = {};

  // Aggregate the values for entries with the same color
  for (const data of pieDataa) {
    if (aggregatedData[data.color]) {
      aggregatedData[data.color] += data.value;
    } else {
      aggregatedData[data.color] = data.value;
    }
  }

  // Create a new array with the aggregated values
  const updatedPieDataa = Object.entries(aggregatedData).map(
    ([color, value]) => ({color, value}),
  );
  console.log('==============>', pieDataa);

  // const ssArray = middleDates.map((val, index, arr) =>
  //   datafun(val, index, arr),
  // );

  // function datafun(data) {
  //   const dataa = graphdata.response[1];
  //   const res = dataa.map(obj =>
  //     obj.value.filter(pro => pro.task_created_datetime === data),
  //   );
  //   const stacks = [];

  //   res.forEach(items => {
  //     let stackObj = 0;
  //     let sObj = 0;
  //     items.forEach(item => {
  //       const timeParts = item.total_time.split(':');
  //       const hours = parseInt(timeParts[0]);
  //       const minutes = parseInt(timeParts[1]);
  //       const seconds = parseInt(timeParts[2]);

  //       const decimalHours = hours + minutes / 60 + seconds / 3600;
  //       const formattedHours = decimalHours.toFixed(1);
  //       stackObj = {
  //         value: formattedHours,
  //       };
  //       // console.log(item.task_created_datetime + '===' + data);
  //       console.log(data);
  //       //if (item.task_created_datetime === data) {
  //       barData.push({
  //         value: formattedHours,
  //         label: data,
  //         color: '#07bc0c',
  //       });
  //       //}
  //       // else if(){}
  //     });
  //   });

  //   // If no items found for the current date, add sObj with value 0 and color 'red'
  //   if (stacks.length === 0) {
  //     barData.push({
  //       value: 0,
  //       label: data,
  //       color: '#07bc0c',
  //     });
  //   }
  //   return {
  //     barData,
  //     // stacks,
  //     // label: data,
  //   };
  // }

  // //  const cc = ssArray.flat();
  // console.log(ssArray);
  // console.log('>>>>>>>>>>>>>>>>' + stackData.map(val => typeof val));

  // stackData.map(val => if(val.label==)),

  //.map(val => val.value.map(val1 => val1.client_id))
  // const transformedData = [];
  // //console.log('@@@@@@@@@@@@@@@@', graphdata.response[1]);
  // graphdata.response[1].map(item => {
  //   const label = item.value.map(val => val.task_created_datetime);
  //   const stacks = item.value.map(valueItem => ({
  //     value: valueItem.task_created_datetime,
  //     color: valueItem.project_color_code,
  //   }));
  //   transformedData.push({stacks, label});
  // });
  // console.log('####################', transformedData);
  // const frequency = {};
  // staticData
  //   .map(item => item.project_name) // Extract the values dynamically
  //   .forEach(value => {
  //     if (frequency[value]) {
  //       frequency[value]++;
  //     } else {
  //       frequency[value] = 1;
  //     }
  //   });

  // console.log(frequency);
  // const headers = {
  //   'Postman-Token': '',
  //   'Content-Type': 'application/json', // Example header
  //   'Content-Length': '',
  //   Host: '',
  //   'User-Agent': 'PostmanRuntime/7.32.2',
  //   Accept: '*/*',
  //   'Accept-Encoding': 'gzip, deflate, br',
  //   Connection: 'keep-alive',
  //   'Cache-Control': 'no-cache',
  // };
  // console.log(body);
  // axios
  //   .post(
  //     'https://183.82.113.10:4179/analyze/get/dashboad/all/tasks/weekly/filter/by/descrip',
  //     body,
  //   )
  //   .then(response =>
  //     console.log('====================>', response.data.response),
  //   )
  //.catch(error => console.log('llllllll', error));
  // const data = {
  //   labels: ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6'],
  //   legend: ['L1', 'L2', 'L3', 'l4'],
  //   data: [
  //     [60, 60, 60],
  //     [30, 30, 60],
  //     [20, 60, 60],
  //     [10, 30, 60],
  //     [60, 60, 60],
  //     [5, 30, 60],
  //   ],
  //   barColors: ['yellow', 'blue', '#a4b0be'],
  // };
  // const chartConfig = {
  //   backgroundGradientFrom: '#1E2923',
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: '#08130D',
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
  // };
  graphdata1?.response?.[1]?.map(val => console.log(val?.value));
  return (
    <>
      <View style={styles.drawerHeader}>
        <TouchableOpacity
          style={{flex: 2}}
          onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={25} style={{paddingLeft: 10}} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reports</Text>
        <Text style={styles.headerRight}></Text>
      </View>
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
      <ScrollView>
        <View
          style={{backgroundColor: 'lightgray', marginTop: 10, padding: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={{flex: 3}}>
              <Text style={styles.text}>TotalTime</Text>
              <Text style={{fontSize: 16}}>
                {graphdata1?.response[0]?.total_time}
              </Text>
            </View>
            <View style={{flex: 4}}>
              <Text style={styles.text}>Top Project</Text>
              <Text style={{fontSize: 16}}>
                {graphdata1?.response[0]?.top_project?.project_name}
              </Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.text}>Top Client</Text>
              <Text style={{fontSize: 16}}>
                {graphdata1?.response[0]?.top_project?.client_name}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 15,
            }}>
            {ff.length > 0 ? (
              <BarChart
                showFractionalValue
                showYAxisIndices
                data={ff}
                spacing={74}
                isAnimated
              />
            ) : (
              <Text></Text>
            )}

            {/* <StackedBarChart
              data={data}
              width={370}
              height={220}
              const
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: 'red',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(50, 255, 146, ${opacity})`,
                strokeWidth: 5, // optional, default 3
                barPercentage: 0.8,
                useShadowColorFromDataset: false, // optional
              }}
            /> */}
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <PieChart
              donut
              innerRadius={50}
              data={updatedPieDataa}
              radius={80}
              centerLabelComponent={() => {
                return (
                  <Text style={{fontSize: 30}}>
                    {graphdata1?.response[0]?.total_time?.slice(0, 5)}
                  </Text>
                );
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
              borderWidth: 2,
              alignSelf: 'flex-end',
              padding: 5,
              borderRadius: 3,
            }}>
            <View style={{flex: 4}}>
              <Text style={styles.text}>Project</Text>
              {graphdata1?.response[1]?.map(val => (
                <Text style={{fontSize: 16}}>{val?.project_name}</Text>
              ))}
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.text}>Client</Text>
              {graphdata1?.response[1]?.map(val => {
                const uniqueClientNames = val?.value?.filter(
                  (val1, index, array) => {
                    // Filter out client names that appear after the first occurrence in the array
                    return (
                      array.findIndex(
                        item => item.client_name === val1.client_name,
                      ) === index
                    );
                  },
                );

                return uniqueClientNames.map(val1 => (
                  <Text style={{fontSize: 16}}>{val1?.client_name}</Text>
                ));
              })}
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.text}>Duration</Text>
              {graphdata1?.response[1]?.map(val => {
                const uniqueDuration = val?.value?.filter(
                  (val1, index, array) => {
                    // Filter out client names that appear after the first occurrence in the array
                    return (
                      array.findIndex(
                        item => item.total_time === val1.total_time,
                      ) === index
                    );
                  },
                );

                return uniqueDuration.map(val1 => (
                  <Text style={{fontSize: 16}}>{val1?.total_time}</Text>
                ));
              })}
            </View>
          </View>
        </View>
        {/* <View
          style={{
            backgroundColor: 'lightgray',
          }}>
          <Text style={{fontSize: 25}}>Most Tracked Activities</Text>
          <FlatList
            data={staticData}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: '#fff',
                  margin: 5,
                  borderRadius: 5,
                  padding: 5,
                }}>
                <Text style={{color: 'black', fontSize: 16}}>
                  {item.task_description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 17}}>{item.project_name}</Text>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    {item.task_total_time}
                  </Text>
                </View>
              </View>
            )}
            ListFooterComponent={<View style={{height: 20}}></View>}
          />
        </View> */}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
  drawerHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButton: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 6,
    paddingLeft: 60,
  },
  headerRight: {
    flex: 2,
  },
  text: {fontSize: 20, color: 'black'},
});
export default Reports;
