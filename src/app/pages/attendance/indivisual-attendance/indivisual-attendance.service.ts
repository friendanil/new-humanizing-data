import { openModal } from "../../listItem/listItem.service";
import { Attendance } from "../attendance.helper";


export async function showEditAttendanceModal(attendanceList: Attendance[]) {
    console.log("open Edit Attendance Modal clicked!");
    const xyz = await openModal("edit-attendance-modal");
    console.log("xyz", xyz);
}