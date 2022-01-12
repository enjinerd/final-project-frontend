import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

export const idLocalCalendar = {
  // months list by order
  months: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "Nopember",
    "Desember",
  ],

  // week days by order
  weekDays: [
    {
      name: "Minggu", // used for accessibility
      short: "M", // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
    {
      name: "Senin",
      short: "S",
    },
    {
      name: "Selasa",
      short: "S",
    },
    {
      name: "Rabu",
      short: "R",
    },
    {
      name: "Kamis",
      short: "K",
    },
    {
      name: "Jum'at",
      short: "J",
    },
    {
      name: "Sabtu",
      short: "S",
      isWeekend: true,
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 0,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit) {
    return digit;
  },

  // texts in the date picker
  nextMonth: "Bulan Selanjutnya",
  previousMonth: "Bulan Sebelumnya",
  openMonthSelector: "Buka Pilihan Bulan",
  openYearSelector: "Buka Pilihan Tahun",
  closeMonthSelector: "Tutup Pilihan Bulan",
  closeYearSelector: "Buka Pilihan Tahun",
  defaultPlaceholder: "Pilih...",

  // for input range value
  from: "from",
  to: "to",

  // used for input value when multi dates are selected
  digitSeparator: ",",

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
};
