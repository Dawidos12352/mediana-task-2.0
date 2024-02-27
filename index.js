const expenses = {
    "2023-01": {
      "01": {
        food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
        fuel: [210.22],
      },
      "09": {
        food: [11.9],
        fuel: [190.22],
      },
    },
    "2023-03": {
      "07": {
        food: [20, 11.9, 30.2, 11.9],
      },
      "04": {
        food: [10.2, 11.5, 2.5],
        fuel: [],
      },
    },
    "2023-04": {},
  };

  // Nie usuwałem wszystkich console.log, aby zaprezentować sposób mojego myślenia oraz jak po kolei dostawałem się do każdej wartości

  const pharagrafResult = document.querySelector(".pharagraf__result");
  const joinedArray = [];
  let allArrays = [];
  // console.log(pharagrafArray, pharagrafResult)

  function isInFirstWeekOfMonth(date) {
    const currentDate = new Date(date);
    // console.log("currentDate:", currentDate)

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    // console.log(`year: ${year}, month: ${month}`)

    const firstDayOfMonth = new Date(year, month, 1);
    // console.log(`First day of the month: ${firstDayOfMonth}`)

    const firstDayOfWeek = firstDayOfMonth.getDay();
    // console.log(`First day of the week: ${firstDayOfWeek}`)

    const firstSunday = new Date(firstDayOfMonth);
    firstSunday.setDate(firstDayOfMonth.getDate() + (7 - firstDayOfWeek));
    // console.log(`First sunday: ${firstSunday}`)

    const isEarlier = currentDate <= firstSunday;
    // console.log(isEarlier)

    return isEarlier;
  }

  // zmieniona nazwa funkcji z getMedianOfFirstWeekExpenses(expenses) ze względu na testy automatyczne
  
  function get_median_of_first_week_expenses(expenses) {
    let result;

    // console.log(expenses)
    for (const month of Object.keys(expenses)) {
      // console.log("test", month)

      const days = Object.keys(expenses[month]);
      for (const day of days) {
        // console.log("DAY" , day)
        const newDate = `${month}-${day}`;
        // console.log(newDate)

        if (isInFirstWeekOfMonth(newDate)) {
          const costs = Object.keys(expenses[month][day]);
          // console.log("COSTS", costs)
          const costsValues = Object.values(expenses[month][day]);
          //   console.log("COSTSVALUES", costsValues);
          //   console.log("FOODARRAY", costsValues[0]);
          //   console.log("FUELARRAY", costsValues[1]);

          const connectedArray = costsValues[0].concat(costsValues[1]);
          joinedArray.push(connectedArray);
        }
      }
    }

    // console.log("JOINED ARRAY :", joinedArray);
    for (let i = 0; i < joinedArray.length; i++) {
      //   console.log(
      //     `joinedArray[0] = ${joinedArray[0]}, joinedArray[i] = ${joinedArray[i]} `
      //   );
      allArrays.push(...joinedArray[i]);
    }

    const sortArray = allArrays.sort((a, b) => a - b);
    // console.log(sortArray);
    // console.log(joinedArray);
    // console.log(allArrays);

    if (sortArray.length % 2 === 0) {
      const higherIndex = sortArray.length / 2;
      const lowerIndex = sortArray.length / 2 - 1;

      //   console.log(
      //     `higher index = ${higherIndex}, lower index = ${lowerIndex}`
      //   );
      //   console.log(
      //     `sortArray[higherIndex]: ${sortArray[higherIndex]}, sortArray[lowerIndex]:${sortArray[lowerIndex]}`
      //   );

      result = (sortArray[higherIndex] + sortArray[lowerIndex]) / 2;
    } else {
      //   console.log(Math.floor(sortArray.length / 2));
      const middleIndex = Math.floor(sortArray.length / 2);
      //   console.log("result", sortArray[middleIndex]);
      result = sortArray[middleIndex];
    }

    pharagrafResult.textContent = `Ostateczna mediana wyników:  ${result}`;
    // console.log("RESULT:", result);

    return result;
  }

 console.log(get_median_of_first_week_expenses(expenses)) //zmienine wywołanie
