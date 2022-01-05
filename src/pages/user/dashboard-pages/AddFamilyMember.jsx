import { Page, PageContent } from "components/layout/page";
import { idLocalCalendar } from "components/ui";
import { useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

export function AddFamilyMember() {
  const [selectedDay, setSelectedDay] = useState(null);
  const handleDate = (val) => {
    setSelectedDay(val);
    let date = new Date(`${val.year}-${val.month}-${val.day}`);
    console.log(date);
  };
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center sm:text-xl font-primary">
            Tambah Anggota Keluarga
          </h1>
          <div class="form-control space-y-1">
            <label class="label">
              <span class="label-text font-bold">NIK</span>
            </label>
            <input
              type="text"
              placeholder="15 Digit No KTP"
              class="input input-bordered"
              name="nik"
            />
            <label class="label">
              <span class="label-text font-bold">Nama Lengkap</span>
            </label>
            <input
              type="text"
              placeholder="Budi Setiawan"
              class="input input-bordered"
              name="name"
            />
            <label class="label">
              <span class="label-text font-bold">Alamat</span>
            </label>
            <input
              type="text"
              placeholder="Jalan Contoh No 1, Desa Contoh, Kota Semarang, Jawa Tengah"
              class="input input-bordered"
              name="name"
            />
            <label className="label">
              <span className="label-text font-bold">Tanggal Lahir</span>
            </label>{" "}
            <DatePicker
              value={selectedDay}
              onChange={handleDate}
              inputClassName="input input-bordered w-full shadow-lg"
              calendarClassName="text-sm sm:text-base"
              inputPlaceholder="Piilh Tanggal"
              calendarPopperPosition="top"
              locale={idLocalCalendar}
              shouldHighlightWeekends
            />
          </div>
          <button type="submit" class="btn btn-block">
            Tambahkan
          </button>
        </div>
      </PageContent>
    </Page>
  );
}
