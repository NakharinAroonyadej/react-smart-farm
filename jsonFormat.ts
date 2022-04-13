// กราฟอุณหภูมิ :
// 24 จุด ย้อนหลัง (ชม.)
// 7 จุด ย้อนหลัง (วัน.)
// 30 จุด ย้อนหลัง (วัน)
// เปลี่ยนเป็นกราฟโค้ง
// path : <get> react-smart-farm-controller.com/graph/<day|week|month> => day 24 ชม, week 7 วัน, month 30 วัน //รายชั่วโมง
const a = [
  {
    date: 1000000000000, // unix-timestamp
    temp: 36,
    air: 36,
    earth: 36,
  },
  {
    date: 1000000000000, // unix-timestamp
    temp: 36,
    air: 36,
    earth: 36,
  },
  {
    date: 1000000000000, // unix-timestamp
    temp: 36,
    air: 36,
    earth: 36,
  },
];

// ค่าปัจจุบัน :
// path : <get> react-smart-farm-controller.com/current/
const b = {
  date: 1000000000000, // unix-timestamp
  temp: 36,
  air: 36,
  earth: 36,
};

// relay :
// path : <get> react-smart-farm-controller.com/relay/
const c = {
  relay1: {
    name: "Relay 1",
    active: true,
  },
  relay2: {
    name: "Relay 1",
    active: true,
  },
  relay3: {
    name: "Relay 1",
    active: true,
  },
  relay4: {
    name: "Relay 1",
    active: true,
  },
};

// relay :
// path : <patch> react-smart-farm-controller.com/relay/
const d = {
  relay1: {
    name: "Relay 1",
    active: true,
  },
};