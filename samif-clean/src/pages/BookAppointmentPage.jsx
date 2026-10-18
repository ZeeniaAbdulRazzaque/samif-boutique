import React, { useState } from 'react';
import { SALONS, BRAND } from '../data/boutiqueData';

export default function BookAppointmentPage({ setActivePage }) {
  const [selectedSalonId, setSelectedSalonId] = useState('lahore');
  const [selectedGarment, setSelectedGarment] = useState('Bridal & Trousseau Couture');
  const [selectedDate, setSelectedDate] = useState('18');
  const [selectedTime, setSelectedTime] = useState('03:30 PM - 05:00 PM (Afternoon Master Fitting)');
  const [isBooked, setIsBooked] = useState(false);

  const [formData, setFormData] = useState({
    patronName: '',
    contactNumber: '',
    email: '',
    eventDate: '',
    specialNotes: '',
  });

  const activeSalon = SALONS.find((s) => s.id === selectedSalonId) || SALONS[0];

  const timeSlots = [
    { id: 't1', label: '11:30 AM – 01:00 PM', desc: 'Morning Session' },
    { id: 't2', label: '03:30 PM – 05:00 PM', desc: 'Afternoon Fitting (Popular)' },
    { id: 't3', label: '06:00 PM – 07:30 PM', desc: 'Evening Consultation' },
    { id: 't4', label: '08:00 PM – 09:30 PM', desc: 'Late Evening Slot' },
  ];

  const garmentTypes = [
    'Bridal & Trousseau',
    'Festive Formal Pret',
    'Velvet Winter Edit',
    'Custom Stitching Consultation',
    'Alteration Check',
  ];

  const calendarDays = [
    { day: 14, label: 'Mon', available: true },
    { day: 15, label: 'Tue', available: true },
    { day: 16, label: 'Wed', available: true },
    { day: 17, label: 'Thu', available: true },
    { day: 18, label: 'Fri', available: true },
    { day: 19, label: 'Sat', available: true },
    { day: 20, label: 'Sun', available: false },
    { day: 21, label: 'Mon', available: true },
    { day: 22, label: 'Tue', available: true },
    { day: 23, label: 'Wed', available: true },
    { day: 24, label: 'Thu', available: true },
    { day: 25, label: 'Fri', available: true },
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="w-full bg-surface pb-24">
      {/* Top Operational Breadcrumb */}
      <section className="w-full bg-surface-container-low/70 border-b border-outline-variant/30 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs font-label-sm uppercase tracking-wider text-on-surface-variant">
            <button
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-primary transition-colors"
            >
              Home
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Book Appointment</span>
          </nav>
        </div>
      </section>

      {/* Editorial Page Header & Values Banner */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 sm:pt-12">
        <div className="max-w-3xl">
          <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary font-semibold">
            In-Store &amp; Home Visit
          </span>
          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface mt-2 leading-tight">
            Book an Appointment
          </h1>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
            Book a one-on-one session with our master tailor at any of our stores or request a home visit service. Explore fabric samples, discuss silhouettes, and get measured accurately.
          </p>
        </div>

        {/* 3 Luxury Assurance Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">workspace_premium</span>
            <div>
              <span className="text-xs font-semibold text-on-surface block">Dedicated Tailor</span>
              <span className="text-[11px] text-on-surface-variant">One-on-one consultation</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">straighten</span>
            <div>
              <span className="text-xs font-semibold text-on-surface block">Precise Fitting</span>
              <span className="text-[11px] text-on-surface-variant">Comprehensive body measurements</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">diamond</span>
            <div>
              <span className="text-xs font-semibold text-on-surface block">Fabric &amp; Swatch Library</span>
              <span className="text-[11px] text-on-surface-variant">Pure silk, velvet &amp; gold zari</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Workspace Grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        {isBooked ? (
          <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <div>
              <span className="font-label-sm uppercase tracking-widest text-primary font-semibold">
                Appointment Confirmed
              </span>
              <h2 className="font-headline-xl text-2xl sm:text-3xl text-on-surface mt-1">
                Thank You, {formData.patronName || 'Valued Customer'}
              </h2>
            </div>
            <div className="p-6 rounded-xl bg-surface-container-low text-left space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between pb-2 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Store Location:</span>
                <span className="font-semibold text-on-surface">{activeSalon.name} ({activeSalon.city})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Date &amp; Time:</span>
                <span className="font-semibold text-primary">{selectedDate} October 2026 • {selectedTime}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Garment:</span>
                <span className="font-semibold text-on-surface">{selectedGarment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Store Phone:</span>
                <span className="font-semibold text-on-surface">{activeSalon.phone}</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant max-w-md mx-auto">
              A confirmation message with appointment details and location has been sent to your WhatsApp.
            </p>
            <button
              onClick={() => setIsBooked(false)}
              className="px-8 py-3 bg-primary text-on-primary font-label-sm uppercase tracking-widest rounded-lg shadow-sm hover:bg-primary-container transition-colors"
            >
              Modify or Book Another Session
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* LEFT COLUMN: Booking Flow (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col space-y-12">
              {/* SECTION 1: Salon Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-outline-variant/30">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <h3 className="font-headline-sm text-xl text-on-surface">Select Location or Home Service</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SALONS.map((salon) => {
                    const isSelected = selectedSalonId === salon.id;
                    return (
                      <div
                        key={salon.id}
                        onClick={() => setSelectedSalonId(salon.id)}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20'
                            : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-bold">
                            {salon.city}
                          </span>
                          {isSelected && (
                            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                          )}
                        </div>
                        <h4 className="font-headline-sm text-base text-on-surface font-semibold mt-1">
                          {salon.name}
                        </h4>
                        <p className="text-xs text-on-surface-variant mt-1">
                          {salon.address}
                        </p>
                        <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px]">
                          <span className="text-tertiary font-semibold">{salon.hours}</span>
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                            {salon.slotsAvailableToday} Slots Open
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: Patron Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-outline-variant/30">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <h3 className="font-headline-sm text-xl text-on-surface">Your Contact Details</h3>
                </div>

                <div className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/40 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Fatima Ali"
                        value={formData.patronName}
                        onChange={(e) => setFormData({ ...formData, patronName: e.target.value })}
                        className="w-full bg-surface-container-low border border-outline-variant/60 rounded px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block">
                        WhatsApp / Contact (+92)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0300 1234567"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className="w-full bg-surface-container-low border border-outline-variant/60 rounded px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block">
                        Personal Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-surface-container-low border border-outline-variant/60 rounded px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block">
                        Wedding / Event Date (If applicable)
                      </label>
                      <input
                        type="text"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-surface-container-low border border-outline-variant/60 rounded px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Garment Intention Chips */}
                  <div className="pt-2">
                    <label className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block mb-2">
                      Garment Intention
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {garmentTypes.map((type) => {
                        const isSelected = selectedGarment === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setSelectedGarment(type)}
                            className={`px-3 py-1.5 rounded-full text-xs font-label-sm transition-all ${
                              isSelected
                                ? 'bg-primary text-on-primary font-semibold shadow-xs'
                                : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Preferred Date & Time Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-outline-variant/30">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <h3 className="font-headline-sm text-xl text-on-surface">Select Date &amp; Time Slot</h3>
                </div>

                <div className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/40 space-y-6">
                  {/* Calendar Days Strip */}
                  <div>
                    <span className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block mb-3">
                      October 2026 Availability
                    </span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {calendarDays.map((d) => {
                        const isSelected = selectedDate === String(d.day);
                        return (
                          <button
                            type="button"
                            key={d.day}
                            disabled={!d.available}
                            onClick={() => setSelectedDate(String(d.day))}
                            className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                              isSelected
                                ? 'bg-primary text-on-primary shadow-sm ring-2 ring-primary/30 font-bold'
                                : d.available
                                ? 'bg-surface-container-low text-on-surface hover:border-primary/50 border border-outline-variant/30'
                                : 'bg-surface-container opacity-40 cursor-not-allowed text-on-surface-variant'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-label-sm">{d.label}</span>
                            <span className="text-lg font-headline-sm mt-0.5">{d.day}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <span className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block mb-3">
                      Select Fitting Slot
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedTime.includes(slot.label);
                        return (
                          <div
                            key={slot.id}
                            onClick={() => setSelectedTime(`${slot.label} (${slot.desc})`)}
                            className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5 shadow-xs'
                                : 'border-outline-variant/40 bg-surface-container-low hover:border-primary/40'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-label-md text-xs font-semibold text-on-surface">
                                {slot.label}
                              </span>
                              {isSelected && (
                                <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                              )}
                            </div>
                            <span className="text-[11px] text-on-surface-variant block mt-0.5">
                              {slot.desc}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Reservation Summary (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-6 sm:p-8 shadow-lg space-y-6">
                <div>
                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-semibold">
                    Summary
                  </span>
                  <h3 className="font-headline-sm text-xl text-on-surface mt-1">
                    Appointment Details
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low space-y-3 text-xs">
                  <div>
                    <span className="text-on-surface-variant text-[11px] block uppercase font-label-sm">
                      Selected Location:
                    </span>
                    <span className="font-semibold text-on-surface text-sm">{activeSalon.name}</span>
                    <span className="text-on-surface-variant block mt-0.5">{activeSalon.address}</span>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/20">
                    <span className="text-on-surface-variant text-[11px] block uppercase font-label-sm">
                      Date &amp; Time:
                    </span>
                    <span className="font-semibold text-primary">{selectedDate} October 2026</span>
                    <span className="text-on-surface block mt-0.5">{selectedTime}</span>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/20">
                    <span className="text-on-surface-variant text-[11px] block uppercase font-label-sm">
                      Garment Interest:
                    </span>
                    <span className="font-semibold text-on-surface">{selectedGarment}</span>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/20 flex justify-between">
                    <span className="text-on-surface-variant">Consultation Fee:</span>
                    <span className="text-tertiary font-bold uppercase">Free</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-on-primary font-label-lg text-xs uppercase tracking-widest rounded-lg shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 group active:scale-98 font-semibold"
                >
                  <span>Confirm Appointment</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <div className="text-[11px] text-on-surface-variant text-center space-y-1">
                  <p>Our store team will contact you prior to your visit to confirm.</p>
                  <p className="font-semibold text-primary">Helpline: {BRAND.phone}</p>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
