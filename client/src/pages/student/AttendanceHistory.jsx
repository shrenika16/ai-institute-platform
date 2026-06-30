import React,
{
 useEffect,
 useState
}
from "react";

import axios from "axios";

function AttendanceHistory() {

const [
attendance,
setAttendance
] = useState([]);

useEffect(() => {

const fetchData =
async () => {

const user = JSON.parse(
  localStorage.getItem("user")
);

const studentId = user?._id;

console.log(
  "LocalStorage User =",
  localStorage.getItem("user")
);

console.log(
  "Parsed User =",
  user
);

console.log(
  "Student ID =",
  studentId
);

const res =
await axios.get(

`http://localhost:5000/api/attendance/${studentId}`

);

setAttendance(
res.data
);

console.log("Attendance API =", res.data);

};

fetchData();

}, []);

const present =
attendance.filter(

(item) =>
item.status === "Present"

).length;

const percentage =
attendance.length > 0

? (
present /
attendance.length
) * 100

: 0;

return (

<div className="p-8">

<h2 className="text-3xl font-bold text-green-600 mb-6">

📅 Attendance History

</h2>

<div className="bg-green-100 p-4 rounded-xl mb-6">

Attendance Percentage:

<strong>

{" "}
{percentage.toFixed(1)}%

</strong>

</div>

<table className="w-full border">

<thead>

<tr>

<th>Date</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{attendance.map(
(item) => (

<tr
key={item._id}
>

<td>

{new Date(
item.date
).toLocaleDateString()}

</td>

<td>

{item.status}

</td>

</tr>

)

)}

</tbody>

</table>

</div>

);

}

export default AttendanceHistory;