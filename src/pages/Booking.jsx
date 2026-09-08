// // import React, { useState, useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import {
// //   FiCheck,
// //   FiArrowRight,
// //   FiAlertCircle,
// //   FiFileText,
// //   FiX,
// //   FiMessageCircle,
// // } from "react-icons/fi";
// // import { useAuth } from "../context/AuthContext";
// // import { useBooking } from "../context/BookingContext";
// // import { calculateDays, calculateTotal, validateEmail } from "../utils/helpers";
// // import Toast from "../components/Toast";
// // import {
// //   getUserByEmail,
// //   carBooking,
// //   getCarImageUrl,
// //   getUserDocuments,
// // } from "../services/carService";

// // const Booking = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();
// //   const { addBooking } = useBooking();

// //   const car = location.state?.car;

  

// //   const [toast, setToast] = useState(null);
// //   const [step, setStep] = useState(1);
// //   const [profileData, setProfileData] = useState(null);
// //   const [errors, setErrors] = useState({});

// //   const [documentData, setDocumentData] = useState(null);
// //   const [documentStatus, setDocumentStatus] = useState("NOT_UPLOADED");
// //   const [documentLoading, setDocumentLoading] = useState(true);
// //   const [showDocumentMessage, setShowDocumentMessage] = useState(false);

// //   const [formData, setFormData] = useState({
// //     pickupDate: "",
// //     dropoffDate: "",
// //     pickupLocation: "",
// //     dropoffLocation: "",
// //     tripType: "",
// //     firstName: user?.firstName || "",
// //     lastName: user?.lastName || "",
// //     email: user?.email || "",
// //     phone: user?.phone || "",
// //     licenseNumber: "",
// //     licenseExpiry: "",
// //     aadhaarNumber: "",
// //     insuranceType: "basic",
// //     additionalServices: [],
// //   });

// //   const formatRupees = (amount) => {
// //     return new Intl.NumberFormat("en-IN", {
// //       style: "currency",
// //       currency: "INR",
// //       maximumFractionDigits: 0,
// //     }).format(amount || 0);
// //   };

// //   const normalizeDocumentStatus = (value) => {
// //     const status = String(value || "")
// //       .trim()
// //       .toUpperCase();

// //     if (
// //       status === "ACCEPT" ||
// //       status === "ACCEPTED" ||
// //       status === "APPROVED"
// //     ) {
// //       return "ACCEPT";
// //     }

// //     if (status === "REJECT" || status === "REJECTED") {
// //       return "REJECT";
// //     }

// //     if (status === "PENDING" || status === "UNDER_REVIEW") {
// //       return "PENDING";
// //     }

// //     return "NOT_UPLOADED";
// //   };

// //   const fetchUserDocuments = async () => {
// //     try {
// //       setDocumentLoading(true);

// //       const response = await getUserDocuments();

// //       let latestDocument = response?.data ?? response;

// //       if (Array.isArray(latestDocument)) {
// //         latestDocument =
// //           latestDocument.length > 0
// //             ? latestDocument[latestDocument.length - 1]
// //             : null;
// //       }

// //       if (!latestDocument) {
// //         setDocumentData(null);
// //         setDocumentStatus("NOT_UPLOADED");

// //         setFormData((previous) => ({
// //           ...previous,
// //           licenseNumber: "",
// //           licenseExpiry: "",
// //           aadhaarNumber: "",
// //         }));

// //         return null;
// //       }

// //       console.log("User Documents:", latestDocument);

// //       const status = normalizeDocumentStatus(
// //         latestDocument.status ??
// //           latestDocument.documentStatus ??
// //           latestDocument.verificationStatus,
// //       );

// //       const rawLicenseExpiry =
// //         latestDocument.licenseExpiry ??
// //         latestDocument.drivingLicenseExpiry ??
// //         latestDocument.drivingLicenceExpiry ??
// //         "";

// //       const normalizedLicenseExpiry = rawLicenseExpiry
// //         ? String(rawLicenseExpiry).split("T")[0]
// //         : "";

// //       setDocumentData(latestDocument);
// //       setDocumentStatus(status);

// //       setFormData((previous) => ({
// //         ...previous,

// //         licenseNumber:
// //           latestDocument.drivingLicenseNo ??
// //           latestDocument.drivingLicenseNumber ??
// //           latestDocument.drivingLicenceNumber ??
// //           latestDocument.licenseNumber ??
// //           "",

// //         licenseExpiry: normalizedLicenseExpiry,

// //         aadhaarNumber:
// //           latestDocument.aadharNo ??
// //           latestDocument.aadhaarNumber ??
// //           latestDocument.aadhaarCardNumber ??
// //           latestDocument.aadhharNumber ??
// //           "",
// //       }));

// //       return {
// //         data: latestDocument,
// //         status,
// //       };
// //     } catch (error) {
// //       console.error(
// //         "Document Fetch Error:",
// //         error.response?.data || error.message,
// //       );

// //       setDocumentData(null);
// //       setDocumentStatus("NOT_UPLOADED");

// //       return null;
// //     } finally {
// //       setDocumentLoading(false);
// //     }
// //   };

// //   const validateIndianPhone = (phone) => {
// //     return /^[6-9]\d{9}$/.test(phone);
// //   };

// //   const validateAadhaar = (aadhaar) => {
// //     return /^\d{12}$/.test(aadhaar);
// //   };

// //   const handleBooking = async () => {
// //   try {
// //     const response = await carBooking(bookingData);

// //     console.log("Booking successful:", response);

// //     //alert("Car booked successfully");
// //      alert(response.message || "Car booked successfully");
// //   } catch (error) {
// //     console.error("Booking failed:", error);

// //     alert(error.message);
// //   }
// // };

// // // const handleBookViaWhatsApp = () => {
// // //   const actualCarId = car?.carId ?? car?.id;

// // //   if (!actualCarId) {
// // //     setToast({
// // //       message: "Car information is missing. Please select the car again.",
// // //       type: "error",
// // //     });
// // //     return;
// // //   }

// // //   // Check required booking information
// // //   if (
// // //     !formData.pickupDate ||
// // //     !formData.dropoffDate ||
// // //     !formData.pickupLocation ||
// // //     !formData.dropoffLocation ||
// // //     !formData.tripType
// // //   ) {
// // //     setToast({
// // //       message: "Please complete all booking details first.",
// // //       type: "error",
// // //     });
// // //     return;
// // //   }

// // //   // Validate dates
// // //   const pickup = new Date(formData.pickupDate);
// // //   const dropoff = new Date(formData.dropoffDate);

// // //   const calculatedDays = Math.ceil(
// // //     (dropoff.getTime() - pickup.getTime()) /
// // //       (1000 * 60 * 60 * 24)
// // //   );

// // //   if (!Number.isFinite(calculatedDays) || calculatedDays <= 0) {
// // //     setToast({
// // //       message: "Please select valid pickup and drop-off dates.",
// // //       type: "error",
// // //     });
// // //     return;
// // //   }

// // //   const pricePerDay = Number(car?.price || 0);

// // //   const bookingSubtotal = calculatedDays * pricePerDay;

// // //   const bookingInsurance =
// // //     formData.tripType === "SELF_DRIVE"
// // //       ? bookingSubtotal * 0.1
// // //       : bookingSubtotal * 0.05;

// // //   const bookingTax =
// // //     (bookingSubtotal + bookingInsurance) * 0.1;

// // //   const bookingTotal =
// // //     bookingSubtotal + bookingInsurance + bookingTax;

// // //   // Customer information
// // //   const firstName =
// // //     formData.firstName ||
// // //     profileData?.firstName ||
// // //     "";

// // //   const lastName =
// // //     formData.lastName ||
// // //     profileData?.lastName ||
// // //     "";

// // //   const email =
// // //     formData.email ||
// // //     profileData?.email ||
// // //     "";

// // //   const phone =
// // //     formData.phone ||
// // //     profileData?.phone ||
// // //     "";

// // //   const customerName =
// // //     `${firstName} ${lastName}`.trim();

// // //   const tripType =
// // //     formData.tripType === "SELF_DRIVE"
// // //       ? "Drive Yourself"
// // //       : formData.tripType === "HIRED_DRIVER"
// // //         ? "Hired Driver"
// // //         : formData.tripType;

// // //   // Mask Aadhaar - NEVER send complete Aadhaar to WhatsApp
// // //   let maskedAadhaar = "Not Provided";

// // //   if (
// // //     formData.aadhaarNumber &&
// // //     formData.aadhaarNumber.length >= 4
// // //   ) {
// // //     maskedAadhaar =
// // //       `XXXX XXXX ${formData.aadhaarNumber.slice(-4)}`;
// // //   }

// // //   const message = `
// // // 🚗 *NEW CAR BOOKING REQUEST*

// // // ━━━━━━━━━━━━━━━━━━━━
// // // 🚘 *CAR DETAILS*
// // // ━━━━━━━━━━━━━━━━━━━━

// // // Car: ${car?.name || "N/A"}
// // // Brand: ${car?.brand || "N/A"}
// // // Daily Rate: ${formatRupees(pricePerDay)}

// // // ━━━━━━━━━━━━━━━━━━━━
// // // 📅 *TRIP DETAILS*
// // // ━━━━━━━━━━━━━━━━━━━━

// // // Pickup Date: ${formData.pickupDate}
// // // Dropoff Date: ${formData.dropoffDate}

// // // Pickup Location: ${formData.pickupLocation}
// // // Dropoff Location: ${formData.dropoffLocation}

// // // Trip Type: ${tripType}

// // // ━━━━━━━━━━━━━━━━━━━━
// // // 👤 *CUSTOMER DETAILS*
// // // ━━━━━━━━━━━━━━━━━━━━

// // // Name: ${customerName || "N/A"}
// // // Email: ${email || "N/A"}
// // // Phone: ${phone || "N/A"}

// // // ${
// // //   formData.tripType === "SELF_DRIVE"
// // //     ? `
// // // ━━━━━━━━━━━━━━━━━━━━
// // // 🪪 *DRIVER DETAILS*
// // // ━━━━━━━━━━━━━━━━━━━━

// // // License Number: ${formData.licenseNumber || "N/A"}
// // // License Expiry: ${formData.licenseExpiry || "N/A"}
// // // Aadhaar: ${maskedAadhaar}
// // // `
// // //     : ""
// // // }

// // // ━━━━━━━━━━━━━━━━━━━━
// // // 💰 *BOOKING SUMMARY*
// // // ━━━━━━━━━━━━━━━━━━━━

// // // Rental Days: ${calculatedDays}
// // // Daily Rate: ${formatRupees(pricePerDay)}

// // // Subtotal: ${formatRupees(bookingSubtotal)}
// // // Insurance: ${formatRupees(bookingInsurance)}
// // // Tax: ${formatRupees(bookingTax)}

// // // *TOTAL: ${formatRupees(bookingTotal)}*

// // // ━━━━━━━━━━━━━━━━━━━━

// // // Please confirm my car booking.

// // // Thank you.
// // //   `.trim();

// // //   // IMPORTANT:
// // //   // Replace this with YOUR business WhatsApp number.
// // //   // India example: 919876543210
// // //   const whatsappNumber = "918378891656";

// // //   const whatsappUrl =
// // //     `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
// // //       message
// // //     )}`;

// // //   window.open(
// // //     whatsappUrl,
// // //     "_blank",
// // //     "noopener,noreferrer"
// // //   );
// // // };

// // const handleBookViaWhatsApp = () => {
// //   // ==========================================
// //   // STEP 1 VALIDATION
// //   // ==========================================

// //   if (!validateStep1()) {
// //     setStep(1);

// //     setToast({
// //       message:
// //         "Please complete all booking details first.",
// //       type: "error",
// //     });

// //     return;
// //   }

// //   // ==========================================
// //   // SELF DRIVE VALIDATION
// //   // ==========================================

// //   if (
// //     formData.tripType === "SELF_DRIVE" &&
// //     !validateStep2()
// //   ) {
// //     setStep(2);

// //     setToast({
// //       message:
// //         "Please complete the driver details.",
// //       type: "error",
// //     });

// //     return;
// //   }

// //   try {
// //     // ========================================
// //     // CREATE EXACT SAME BOOKING REQUEST
// //     // ========================================

// //     const bookingRequest =
// //       createBookingRequest();

// //     console.log(
// //       "WhatsApp Booking Request:",
// //       bookingRequest
// //     );

// //     // ========================================
// //     // CUSTOMER INFORMATION
// //     // ========================================

// //     const firstName =
// //       formData.firstName ||
// //       profileData?.firstName ||
// //       "";

// //     const lastName =
// //       formData.lastName ||
// //       profileData?.lastName ||
// //       "";

// //     const email =
// //       formData.email ||
// //       profileData?.email ||
// //       "";

// //     const phone =
// //       formData.phone ||
// //       profileData?.phone ||
// //       "";

// //     const customerName =
// //       `${firstName} ${lastName}`.trim();

// //     // ========================================
// //     // TRIP TYPE DISPLAY
// //     // ========================================

// //     const tripType =
// //       bookingRequest.tripDriverType ===
// //       "SELF_DRIVE"
// //         ? "Drive Yourself"
// //         : bookingRequest.tripDriverType ===
// //           "HIRED_DRIVER"
// //         ? "Hired Driver"
// //         : bookingRequest.tripDriverType;

// //     // ========================================
// //     // MASK AADHAAR
// //     // ========================================

// //     let maskedAadhaar =
// //       "Not Provided";

// //     if (
// //       formData.aadhaarNumber &&
// //       formData.aadhaarNumber.length >= 4
// //     ) {
// //       maskedAadhaar =
// //         `XXXX XXXX ${formData.aadhaarNumber.slice(
// //           -4
// //         )}`;
// //     }

// //     // ========================================
// //     // WHATSAPP MESSAGE
// //     // ========================================

// //     const message = `
// // 🚗 *NEW CAR BOOKING REQUEST*

// // ━━━━━━━━━━━━━━━━━━━━
// // 🚘 *CAR DETAILS*
// // ━━━━━━━━━━━━━━━━━━━━

// // Car: ${car?.name || "N/A"}
// // Brand: ${car?.brand || "N/A"}
// // Car ID: ${bookingRequest.carId}

// // Daily Rate: ${formatRupees(
// //       bookingRequest.price
// //     )}

// // ━━━━━━━━━━━━━━━━━━━━
// // 📅 *TRIP DETAILS*
// // ━━━━━━━━━━━━━━━━━━━━

// // Pickup Date: ${
// //       bookingRequest.pickupDate
// //     }

// // Dropoff Date: ${
// //       bookingRequest.dropoffDate
// //     }

// // Pickup Location: ${
// //       bookingRequest.pickupLocation
// //     }

// // Dropoff Location: ${
// //       bookingRequest.dropoffLocation
// //     }

// // Trip Type: ${tripType}

// // ━━━━━━━━━━━━━━━━━━━━
// // 👤 *CUSTOMER DETAILS*
// // ━━━━━━━━━━━━━━━━━━━━

// // User ID: ${
// //       bookingRequest.userId
// //     }

// // Name: ${
// //       customerName || "N/A"
// //     }

// // Email: ${
// //       email || "N/A"
// //     }

// // Phone: ${
// //       phone || "N/A"
// //     }

// // ${
// //   bookingRequest.tripDriverType ===
// //   "SELF_DRIVE"
// //     ? `
// // ━━━━━━━━━━━━━━━━━━━━
// // 🪪 *DRIVER DETAILS*
// // ━━━━━━━━━━━━━━━━━━━━

// // License Number: ${
// //         formData.licenseNumber ||
// //         "N/A"
// //       }

// // License Expiry: ${
// //         formData.licenseExpiry ||
// //         "N/A"
// //       }

// // Aadhaar: ${
// //         maskedAadhaar
// //       }
// // `
// //     : ""
// // }

// // ━━━━━━━━━━━━━━━━━━━━
// // 💰 *BOOKING SUMMARY*
// // ━━━━━━━━━━━━━━━━━━━━

// // Rental Days: ${
// //       bookingRequest.days
// //     }

// // Daily Rate: ${formatRupees(
// //       bookingRequest.price
// //     )}

// // Total: ${formatRupees(
// //       bookingRequest.total
// //     )}

// // Booking Status: ${
// //       bookingRequest.bookingStatus
// //     }

// // ━━━━━━━━━━━━━━━━━━━━

// // Please confirm my car booking.

// // Thank you.
// // `.trim();

// //     console.log(
// //       "WhatsApp Message:",
// //       message
// //     );

// //     // ========================================
// //     // BUSINESS WHATSAPP NUMBER
// //     // ========================================

// //     const whatsappNumber =
// //       "918378891656";

// //     // ========================================
// //     // CREATE WHATSAPP URL
// //     // ========================================

// //     const whatsappUrl =
// //       `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
// //         message
// //       )}`;

// //     // ========================================
// //     // OPEN WHATSAPP
// //     // ========================================

// //     window.open(
// //       whatsappUrl,
// //       "_blank",
// //       "noopener,noreferrer"
// //     );

// //   } catch (error) {

// //     console.error(
// //       "WhatsApp Booking Error:",
// //       error
// //     );

// //     setToast({
// //       message:
// //         error?.message ||
// //         "Unable to prepare WhatsApp booking.",
// //       type: "error",
// //     });
// //   }
// // };

// //   const validateDrivingLicense = (license) => {
// //     return /^[A-Z]{2}\d{2}\s?\d{11}$/.test(license);
// //   };

// //   const isFutureDate = (date) => {
// //     const selectedDate = new Date(date);
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);
// //     return selectedDate > today;
// //   };

// //   const isTodayOrFutureDate = (date) => {
// //     const selectedDate = new Date(date);
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);
// //     return selectedDate >= today;
// //   };

// //   useEffect(() => {
// //     fetchUserProfile();
// //     fetchUserDocuments();
// //   }, []);

// //   const fetchUserProfile = async () => {
// //     try {
// //       const email = localStorage.getItem("email");
// //       const data = await getUserByEmail(email);

// //       setProfileData(data);

// //       setFormData((prev) => ({
// //         ...prev,
// //         firstName: data?.firstName || prev.firstName,
// //         lastName: data?.lastName || prev.lastName,
// //         email: data?.email || prev.email,
// //         phone: data?.phone || prev.phone,
// //       }));
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   if (!car) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <h1 className="text-4xl font-bold mb-4">No Car Selected</h1>
// //           <button onClick={() => navigate("/cars")} className="btn-primary">
// //             Back to Cars
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const days = calculateDays(formData.pickupDate, formData.dropoffDate);
// //   const subtotal = calculateTotal(car.price, days);
// //   const insurance =
// //     formData.insuranceType === "premium" ? subtotal * 0.1 : subtotal * 0.05;
// //   const tax = (subtotal + insurance) * 0.1;
// //   const total = subtotal + insurance + tax;

// //   const handleInputChange = (e) => {
// //   const { name, value } = e.target;

// //   console.log("Changed field:", name);
// //   console.log("Changed value:", value);

// //   let finalValue = value;

// //   if (name === "aadhaarNumber") {
// //     finalValue = value.replace(/\D/g, "").slice(0, 12);
// //   }

// //   if (name === "phone") {
// //     finalValue = value.replace(/\D/g, "").slice(0, 10);
// //   }

// //   if (name === "licenseNumber") {
// //     finalValue = value.toUpperCase().slice(0, 16);
// //   }

// //   setFormData((prev) => ({
// //     ...prev,
// //     [name]: finalValue,
// //   }));

// //   if (errors[name]) {
// //     setErrors((prev) => ({
// //       ...prev,
// //       [name]: "",
// //     }));
// //   }
// // };

// //   const validateStep1 = () => {
// //     const newErrors = {};

// //     if (!formData.pickupDate) {
// //       newErrors.pickupDate = "Pickup date is required";
// //     } else if (!isTodayOrFutureDate(formData.pickupDate)) {
// //       newErrors.pickupDate = "Pickup date cannot be past date";
// //     }

// //     if (!formData.dropoffDate) {
// //       newErrors.dropoffDate = "Dropoff date is required";
// //     }

// //     if (formData.pickupDate && formData.dropoffDate) {
// //       const pickup = new Date(formData.pickupDate);
// //       const dropoff = new Date(formData.dropoffDate);

// //       if (dropoff <= pickup) {
// //         newErrors.dropoffDate = "Dropoff date must be after pickup date";
// //       }
// //     }

// //     if (!formData.pickupLocation) {
// //       newErrors.pickupLocation = "Pickup location is required";
// //     }

// //     if (!formData.dropoffLocation) {
// //       newErrors.dropoffLocation = "Dropoff location is required";
// //     }

// //     if (!formData.tripType) {
// //       newErrors.tripType = "Trip type is required";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const validateStep2 = () => {
// //     const newErrors = {};

// //     if (!formData.firstName.trim()) {
// //       newErrors.firstName = "First name is required";
// //     }

// //     if (!formData.lastName.trim()) {
// //       newErrors.lastName = "Last name is required";
// //     }

// //     if (!validateEmail(formData.email)) {
// //       newErrors.email = "Valid email is required";
// //     }

// //     if (!validateIndianPhone(formData.phone)) {
// //       newErrors.phone =
// //         "Enter valid 10 digit Indian mobile number starting with 6, 7, 8, or 9";
// //     }

// //     if (!formData.licenseNumber.trim()) {
// //       newErrors.licenseNumber = "Driving license number is required";
// //     } else if (!validateDrivingLicense(formData.licenseNumber)) {
// //       newErrors.licenseNumber =
// //         "Enter valid license number. Example: MH12 20230012345";
// //     }

// //     if (!formData.licenseExpiry) {
// //       newErrors.licenseExpiry = "License expiry date is required";
// //     } else if (!isFutureDate(formData.licenseExpiry)) {
// //       newErrors.licenseExpiry = "Driving license must not be expired";
// //     }

// //     if (!formData.aadhaarNumber) {
// //       newErrors.aadhaarNumber = "Aadhaar number is required";
// //     } else if (!validateAadhaar(formData.aadhaarNumber)) {
// //       newErrors.aadhaarNumber = "Aadhaar number must be exactly 12 digits";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleNextStep = async () => {
// //     if (step === 1) {
// //       if (!validateStep1()) {
// //         return;
// //       }

// //       if (formData.tripType === "HIRED_DRIVER") {
// //         setStep(3);
// //         return;
// //       }

// //       /*
// //        * Self-drive bookings require approved documents.
// //        * Fetch again here so the latest admin status is always checked.
// //        */
// //       const latestDocumentResult = await fetchUserDocuments();
// //       const latestStatus =
// //         latestDocumentResult?.status || documentStatus;

// //       if (latestStatus !== "ACCEPT") {
// //         setShowDocumentMessage(true);
// //         return;
// //       }

// //       setStep(2);
// //       return;
// //     }

// //     if (step === 2 && validateStep2()) {
// //       setStep(3);
// //     }
// //   };

// //   // const handleConfirmBooking = async () => {
// //   //   if (formData.tripType === 'SELF_DRIVE' && !validateStep2()) {
// //   //     setStep(2);
// //   //     return;
// //   //   }

// //   //   const booking = {
// //   //     carName: car.name,
// //   //     brand: car.brand,
// //   //     mainImage: car.mainImage,
// //   //     price: car.price,

// //   //     pickupDate: formData.pickupDate,
// //   //     dropoffDate: formData.dropoffDate,

// //   //     pickupLocation: formData.pickupLocation,
// //   //     dropoffLocation: formData.dropoffLocation,

// //   //     tripType: formData.tripType,

// //   //     days,
// //   //     total: Math.round(total),

// //   //     bookingStatus: 'CONFIRMED',
// //   //   };

// //   //   try {
// //   //     await carBooking(booking);

// //   //     addBooking(booking);

// //   //     setToast({
// //   //       message: 'Booking confirmed successfully!',
// //   //       type: 'success',
// //   //     });

// //   //     setTimeout(() => {
// //   //       navigate('/dashboard');
// //   //     }, 2000);
// //   //   } catch (error) {
// //   //     console.error('Booking Error:', error);

// //   //     setToast({
// //   //       message: 'Booking failed!',
// //   //       type: 'error',
// //   //     });
// //   //   }
// //   // };
// //   // const handleConfirmBooking = async () => {
// //   //   if (formData.tripType === "SELF_DRIVE" && !validateStep2()) {
// //   //     setStep(2);
// //   //     return;
// //   //   }

// //   //   if (!car?.id) {
// //   //     setToast({
// //   //       message: "Car ID is missing. Please select the car again.",
// //   //       type: "error",
// //   //     });
// //   //     return;
// //   //   }

// //   //   const booking = {
// //   //     carId: car.id,

// //   //     carName: car.name,
// //   //     brand: car.brand,
// //   //     mainImage: car.mainImage || car.image,
// //   //     price: Number(car.price),

// //   //     pickupDate: formData.pickupDate,
// //   //     dropoffDate: formData.dropoffDate,

// //   //     pickupLocation: formData.pickupLocation,
// //   //     dropoffLocation: formData.dropoffLocation,

// //   //     tripType: formData.tripType,

// //   //     days: Number(days),
// //   //     total: Math.round(total),

// //   //     bookingStatus: "PENDING",
// //   //   };

// //   //   try {
// //   //     const response = await carBooking(booking);

// //   //     /*
// //   //      * Your backend currently returns the updated booking list.
// //   //      * Therefore, do not directly add the local booking as CONFIRMED.
// //   //      */
// //   //     if (Array.isArray(response)) {
// //   //       const latestBooking = response[response.length - 1];

// //   //       if (latestBooking) {
// //   //         addBooking(latestBooking);
// //   //       }
// //   //     } else if (response) {
// //   //       addBooking(response);
// //   //     }

// //   //     setToast({
// //   //       message: "Booking request sent to admin successfully!",
// //   //       type: "success",
// //   //     });

// //   //     setTimeout(() => {
// //   //       navigate("/dashboard");
// //   //     }, 2000);
// //   //   } catch (error) {
// //   //     console.error("Booking Error:", error.response?.data || error.message);

// //   //     const errorMessage =
// //   //       error.response?.data?.message || error.message || "Booking failed!";

// //   //     setToast({
// //   //       message: errorMessage,
// //   //       type: "error",
// //   //     });
// //   //   }
// //   // };
// // //   const handleConfirmBooking = async () => {
// // //   if (
// // //     formData.tripType === "SELF_DRIVE" &&
// // //     !validateStep2()
// // //   ) {
// // //     setStep(2);
// // //     return;
// // //   }

// // //   const actualCarId = car?.carId ?? car?.id;

// // //   console.log("Complete car object:", car);
// // //   console.log("Cart ID:", car?.cartId);
// // //   console.log("Actual car ID:", actualCarId);

// // //   if (!actualCarId) {
// // //     setToast({
// // //       message:
// // //         "Car ID is missing. Please select the car again.",
// // //       type: "error",
// // //     });

// // //     return;
// // //   }

// // //   const booking = {
// // //     // AdminCarsData ID
// // //     carId: Number(actualCarId),

// // //     carName: car.name,
// // //     brand: car.brand,
// // //     mainImage: car.mainImage || car.image,
// // //     price: Number(car.price),

// // //     pickupDate: formData.pickupDate,
// // //     dropoffDate: formData.dropoffDate,

// // //     pickupLocation: formData.pickupLocation,
// // //     dropoffLocation: formData.dropoffLocation,

// // //     tripType: formData.tripType,

// // //     days: Number(days),
// // //     total: Math.round(total),

// // //     bookingStatus: "PENDING",
// // //   };

// // //   console.log("Booking object before API:", booking);

// // //   try {
// // //     const response = await carBooking(booking);

// // //     if (Array.isArray(response)) {
// // //       const latestBooking =
// // //         response[response.length - 1];

// // //       if (latestBooking) {
// // //         addBooking(latestBooking);
// // //       }
// // //     } else if (response) {
// // //       addBooking(response);
// // //     }

// // //     setToast({
// // //       message:
// // //         "Booking request sent to admin successfully!",
// // //       type: "success",
// // //     });

// // //     setTimeout(() => {
// // //       navigate("/dashboard");
// // //     }, 2000);
// // //   } catch (error) {
// // //     console.error(
// // //       "Booking Error:",
// // //       error.response?.data || error.message
// // //     );

// // //     const errorMessage =
// // //       error.response?.data?.message ||
// // //       error.message ||
// // //       "Booking failed!";

// // //     setToast({
// // //       message: errorMessage,
// // //       type: "error",
// // //     });
// // //   }
// // // };
// // // const handleConfirmBooking = async () => {
// // //   if (
// // //     formData.tripType === "SELF_DRIVE" &&
// // //     !validateStep2()
// // //   ) {
// // //     setStep(2);
// // //     return;
// // //   }

// // //   const actualCarId = car?.carId ?? car?.id;

// // //   console.log("Complete car object:", car);
// // //   console.log("Cart ID:", car?.cartId);
// // //   console.log("Actual Car ID:", actualCarId);

// // //   if (!actualCarId) {
// // //     setToast({
// // //       message:
// // //         "Car ID is missing. Please select the car again.",
// // //       type: "error",
// // //     });
// // //     return;
// // //   }

// // //   if (!formData.pickupDate) {
// // //     setToast({
// // //       message: "Pickup date is required.",
// // //       type: "error",
// // //     });
// // //     setStep(1);
// // //     return;
// // //   }

// // //   if (!formData.dropoffDate) {
// // //     setToast({
// // //       message: "Drop-off date is required.",
// // //       type: "error",
// // //     });
// // //     setStep(1);
// // //     return;
// // //   }

// // //   const booking = {
// // //     carId: Number(actualCarId),
// // //     pickupDate: formData.pickupDate,
// // //     dropoffDate: formData.dropoffDate,
// // //   };

// // //   console.log("Booking object before API:", booking);

// // //   try {
// // //     const response = await carBooking(booking);

// // //     console.log("Booking API response:", response);

// // //     if (Array.isArray(response)) {
// // //       const latestBooking =
// // //         response[response.length - 1];

// // //       if (latestBooking) {
// // //         addBooking(latestBooking);
// // //       }
// // //     } else if (response) {
// // //       addBooking(response);
// // //     }

// // //     setToast({
// // //       message:
// // //         "Booking request sent to admin successfully!",
// // //       type: "success",
// // //     });

// // //     setTimeout(() => {
// // //       navigate("/dashboard");
// // //     }, 2000);
// // //   } catch (error) {
// // //     console.error(
// // //       "Booking Error:",
// // //       error.response?.data || error.message
// // //     );

// // //     const errorMessage =
// // //       error.response?.data?.message ||
// // //       error.response?.data ||
// // //       error.message ||
// // //       "Booking failed!";

// // //     setToast({
// // //       message: errorMessage,
// // //       type: "error",
// // //     });
// // //   }
// // // };
// // const createBookingRequest = () => {
// //   // ==========================================
// //   // USER ID
// //   // ==========================================

// //   const userId = Number(
// //     localStorage.getItem("userId")
// //   );

// //   // ==========================================
// //   // ACTUAL CAR ID
// //   // ==========================================

// //   const actualCarId =
// //     car?.carId ?? car?.id;

// //   // ==========================================
// //   // VALIDATION
// //   // ==========================================

// //   if (!userId) {
// //     throw new Error(
// //       "User ID is missing. Please login again."
// //     );
// //   }

// //   if (!actualCarId) {
// //     throw new Error(
// //       "Car ID is missing. Please select the car again."
// //     );
// //   }

// //   if (!formData.pickupDate) {
// //     throw new Error(
// //       "Pickup date is required."
// //     );
// //   }

// //   if (!formData.dropoffDate) {
// //     throw new Error(
// //       "Drop-off date is required."
// //     );
// //   }

// //   // ==========================================
// //   // DATE CALCULATION
// //   // SAME AS CONFIRM BOOKING
// //   // ==========================================

// //   const pickup = new Date(
// //     formData.pickupDate
// //   );

// //   const dropoff = new Date(
// //     formData.dropoffDate
// //   );

// //   const calculatedDays = Math.ceil(
// //     (dropoff.getTime() - pickup.getTime()) /
// //       (1000 * 60 * 60 * 24)
// //   );

// //   if (
// //     !Number.isFinite(calculatedDays) ||
// //     calculatedDays <= 0
// //   ) {
// //     throw new Error(
// //       "Please select valid pickup and drop-off dates."
// //     );
// //   }

// //   // ==========================================
// //   // CAR PRICE
// //   // ==========================================

// //   const pricePerDay = Number(
// //     car?.price
// //   );

// //   if (!Number.isFinite(pricePerDay)) {
// //     throw new Error(
// //       "Invalid car price."
// //     );
// //   }

// //   // ==========================================
// //   // TOTAL
// //   // EXACT SAME LOGIC AS CONFIRM BOOKING
// //   // ==========================================

// //   const calculatedTotal =
// //     pricePerDay * calculatedDays;

// //   // ==========================================
// //   // COMMON BOOKING REQUEST
// //   // ==========================================

// //   const bookingRequest = {
// //     userId: userId,

// //     carId: Number(actualCarId),

// //     pickupDate:
// //       formData.pickupDate,

// //     dropoffDate:
// //       formData.dropoffDate,

// //     pickupLocation:
// //       formData.pickupLocation,

// //     dropoffLocation:
// //       formData.dropoffLocation,

// //     tripDriverType:
// //       formData.tripType,

// //     days:
// //       calculatedDays,

// //     price:
// //       pricePerDay,

// //     total:
// //       calculatedTotal,

// //     bookingStatus:
// //       "PENDING",
// //   };

// //   console.log(
// //     "================================="
// //   );

// //   console.log(
// //     "COMMON BOOKING REQUEST"
// //   );

// //   console.log(
// //     "================================="
// //   );

// //   console.log(
// //     bookingRequest
// //   );

// //   return bookingRequest;
// // };

// // // const handleConfirmBooking = async () => {
// // //   // Validate step 1 fields again before submitting
// // //   if (!validateStep1()) {
// // //     setStep(1);
// // //     return;
// // //   }

// // //   // Validate driver details for self-drive booking
// // //   if (
// // //     formData.tripType === "SELF_DRIVE" &&
// // //     !validateStep2()
// // //   ) {
// // //     setStep(2);
// // //     return;
// // //   }

// // //   const actualCarId = car?.carId ?? car?.id;
// // //   const userId = Number(localStorage.getItem("userId"));

// // //   if (!userId) {
// // //     setToast({
// // //       message: "User ID is missing. Please login again.",
// // //       type: "error",
// // //     });
// // //     return;
// // //   }

// // //   if (!actualCarId) {
// // //     setToast({
// // //       message: "Car ID is missing. Please select the car again.",
// // //       type: "error",
// // //     });
// // //     return;
// // //   }

// // //   // Calculate days safely
// // //   const pickup = new Date(formData.pickupDate);
// // //   const dropoff = new Date(formData.dropoffDate);

// // //   const calculatedDays = Math.ceil(
// // //     (dropoff.getTime() - pickup.getTime()) /
// // //       (1000 * 60 * 60 * 24)
// // //   );

// // //   const pricePerDay = Number(car?.price);

// // //   if (
// // //     !Number.isFinite(calculatedDays) ||
// // //     calculatedDays <= 0
// // //   ) {
// // //     setToast({
// // //       message: "Please select valid pickup and drop-off dates.",
// // //       type: "error",
// // //     });
// // //     setStep(1);
// // //     return;
// // //   }

// // //   if (!Number.isFinite(pricePerDay)) {
// // //     setToast({
// // //       message: "Invalid car price.",
// // //       type: "error",
// // //     });
// // //     return;
// // //   }

// // //   const calculatedTotal =
// // //     pricePerDay * calculatedDays;

// // //   const bookingRequest = {
// // //   userId: userId,
// // //   carId: Number(actualCarId),

// // //   pickupDate: formData.pickupDate,
// // //   dropoffDate: formData.dropoffDate,

// // //   pickupLocation: formData.pickupLocation,
// // //   dropoffLocation: formData.dropoffLocation,

// // //   tripDriverType: formData.tripType,

// // //   days: calculatedDays,
// // //   price: pricePerDay,
// // //   total: calculatedTotal,

// // //   bookingStatus: "PENDING",
// // // };

// // //  console.log(
// // //   "Request tripDriverType:",
// // //   bookingRequest.tripDriverType
// // // );
// // // console.log(
// // //   "Complete Booking Request:",
// // //   bookingRequest
// // // );

// // //   try {
// // //     const response = await carBooking(bookingRequest);

// // //     console.log("Booking API response:", response);

// // //     if (Array.isArray(response)) {
// // //       const latestBooking =
// // //         response[response.length - 1];

// // //       if (latestBooking) {
// // //         addBooking(latestBooking);
// // //       }
// // //     } else if (response) {
// // //       addBooking(response);
// // //     }

// // //     setToast({
// // //       message:
// // //         "Booking request sent to admin successfully!",
// // //       type: "success",
// // //     });

// // //     setTimeout(() => {
// // //       navigate("/dashboard");
// // //     }, 2000);
// // //   } catch (error) {
// // //     console.error(
// // //       "Booking Error:",
// // //       error.response?.data || error.message
// // //     );

// // //     const errorMessage =
// // //       error.response?.data?.message ||
// // //       error.response?.data ||
// // //       error.message ||
// // //       "Booking failed!";

// // //     setToast({
// // //       message: errorMessage,
// // //       type: "error",
// // //     });
// // //   }
// // // };

// // const handleConfirmBooking = async () => {
// //   // ==========================================
// //   // STEP 1 VALIDATION
// //   // ==========================================

// //   if (!validateStep1()) {
// //     setStep(1);
// //     return;
// //   }

// //   // ==========================================
// //   // SELF DRIVE VALIDATION
// //   // ==========================================

// //   if (
// //     formData.tripType === "SELF_DRIVE" &&
// //     !validateStep2()
// //   ) {
// //     setStep(2);
// //     return;
// //   }

// //   try {
// //     // ========================================
// //     // CREATE COMMON BOOKING REQUEST
// //     // ========================================

// //     const bookingRequest =
// //       createBookingRequest();

// //     console.log(
// //       "Confirm Booking Request:",
// //       bookingRequest
// //     );

// //     // ========================================
// //     // SEND TO BACKEND
// //     // ========================================

// //     const response =
// //       await carBooking(
// //         bookingRequest
// //       );

// //     console.log(
// //       "Booking API response:",
// //       response
// //     );

// //     // ========================================
// //     // UPDATE BOOKING CONTEXT
// //     // ========================================

// //     if (Array.isArray(response)) {
// //       const latestBooking =
// //         response[
// //           response.length - 1
// //         ];

// //       if (latestBooking) {
// //         addBooking(
// //           latestBooking
// //         );
// //       }
// //     } else if (response) {
// //       addBooking(
// //         response
// //       );
// //     }

// //     // ========================================
// //     // SUCCESS
// //     // ========================================

// //     setToast({
// //       message:
// //         "Booking request sent to admin successfully!",
// //       type: "success",
// //     });

// //     setTimeout(() => {
// //       navigate("/dashboard");
// //     }, 2000);

// //   } catch (error) {

// //     console.error(
// //       "Booking Error:",
// //       error
// //     );

// //     const errorMessage =
// //       error?.message ||
// //       "Booking failed!";

// //     setToast({
// //       message:
// //         errorMessage,
// //       type: "error",
// //     });
// //   }
// // };

// //   const locations = ["Mumbai", "Pune", "Nashik", "Nagpur", "Nandurbar"];

// //   return (
// //     <div className="min-h-screen bg-light py-8">
// //       <div className="container-custom">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           <div className="lg:col-span-2">
// //             <div className="flex gap-4 mb-8">
// //               {[1, 2, 3].map((s) => (
// //                 <div key={s} className="flex items-center gap-2">
// //                   <div
// //                     className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
// //                       s <= step
// //                         ? "bg-secondary text-white"
// //                         : "bg-gray-300 text-gray-600"
// //                     }`}
// //                   >
// //                     {s < step ? <FiCheck /> : s}
// //                   </div>

// //                   {s < 3 && (
// //                     <div
// //                       className={`w-12 h-1 transition-all ${
// //                         s < step ? "bg-secondary" : "bg-gray-300"
// //                       }`}
// //                     />
// //                   )}
// //                 </div>
// //               ))}
// //             </div>

// //             {step === 1 && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 className="bg-white p-8 rounded-xl card-shadow"
// //               >
// //                 <h2 className="text-2xl font-bold mb-6">Trip Details</h2>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //                   <div>
// //                     <label className="block text-sm font-semibold mb-2">
// //                       Pickup Date
// //                     </label>
// //                     <input
// //                       type="date"
// //                       name="pickupDate"
// //                       value={formData.pickupDate}
// //                       onChange={handleInputChange}
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.pickupDate ? "border-red-500" : "border-gray-300"
// //                       }`}
// //                     />
// //                     {errors.pickupDate && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.pickupDate}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-semibold mb-2">
// //                       Dropoff Date
// //                     </label>
// //                     <input
// //                       type="date"
// //                       name="dropoffDate"
// //                       value={formData.dropoffDate}
// //                       onChange={handleInputChange}
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.dropoffDate
// //                           ? "border-red-500"
// //                           : "border-gray-300"
// //                       }`}
// //                     />
// //                     {errors.dropoffDate && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.dropoffDate}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-semibold mb-2">
// //                       Pickup Location
// //                     </label>
// //                     <select
// //                       name="pickupLocation"
// //                       value={formData.pickupLocation}
// //                       onChange={handleInputChange}
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.pickupLocation
// //                           ? "border-red-500"
// //                           : "border-gray-300"
// //                       }`}
// //                     >
// //                       <option value="">Select Location</option>
// //                       {locations.map((loc) => (
// //                         <option key={loc} value={loc}>
// //                           {loc}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     {errors.pickupLocation && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.pickupLocation}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-semibold mb-2">
// //                       Dropoff Location
// //                     </label>
// //                     <select
// //                       name="dropoffLocation"
// //                       value={formData.dropoffLocation}
// //                       onChange={handleInputChange}
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.dropoffLocation
// //                           ? "border-red-500"
// //                           : "border-gray-300"
// //                       }`}
// //                     >
// //                       <option value="">Select Location</option>
// //                       {locations.map((loc) => (
// //                         <option key={loc} value={loc}>
// //                           {loc}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     {errors.dropoffLocation && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.dropoffLocation}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div className="md:col-span-2">
// //                     <label className="block text-sm font-semibold mb-2">
// //                       Trip Type
// //                     </label>

// //                     <select
// //                       name="tripType"
// //                       value={formData.tripType}
// //                       onChange={handleInputChange}
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.tripType ? "border-red-500" : "border-gray-300"
// //                       }`}
// //                     >
// //                       <option value="">Select Trip Type</option>
// //                       <option value="SELF_DRIVE">Drive Yourself</option>
// //                       <option value="HIRED_DRIVER">Hired Driver</option>
// //                     </select>

// //                     {errors.tripType && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.tripType}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <button
// //                   type="button"
// //                   onClick={handleNextStep}
// //                   disabled={documentLoading}
// //                   className="btn-primary w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
// //                 >
// //                   {documentLoading ? (
// //                     <>
// //                       <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
// //                       Checking Documents...
// //                     </>
// //                   ) : (
// //                     <>
// //                       Continue <FiArrowRight />
// //                     </>
// //                   )}
// //                 </button>
// //               </motion.div>
// //             )}

// //             {step === 2 && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 className="bg-white p-8 rounded-xl card-shadow"
// //               >
// //                 <h2 className="text-2xl font-bold mb-6">Driver Information</h2>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //                   <div>
// //                     <label className="block text-sm font-semibold mb-2">
// //                       First Name
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="firstName"
// //                       value={formData.firstName}
// //                       onChange={handleInputChange}
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.firstName ? "border-red-500" : "border-gray-300"
// //                       }`}
// //                     />
// //                     {errors.firstName && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.firstName}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-semibold mb-2">
// //                       Last Name
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="lastName"
// //                       value={formData.lastName}
// //                       onChange={handleInputChange}
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.lastName ? "border-red-500" : "border-gray-300"
// //                       }`}
// //                     />
// //                     {errors.lastName && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.lastName}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-semibold mb-2">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleInputChange}
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.email ? "border-red-500" : "border-gray-300"
// //                       }`}
// //                     />
// //                     {errors.email && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.email}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-semibold mb-2">
// //                       Phone
// //                     </label>
// //                     <input
// //                       type="tel"
// //                       name="phone"
// //                       value={formData.phone}
// //                       onChange={handleInputChange}
// //                       placeholder="10 digit mobile number"
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.phone ? "border-red-500" : "border-gray-300"
// //                       }`}
// //                     />
// //                     {errors.phone && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.phone}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-semibold mb-2">
// //                       Driving License Number
// //                     </label>
// //                     {/* <input
// //                       type="text"
// //                       name="licenseNumber"
// //                       value={formData.licenseNumber}
// //                       onChange={handleInputChange}
// //                       placeholder="Example: MH12 20230012345"
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.licenseNumber
// //                           ? "border-red-500"
// //                           : "border-gray-300"
// //                       }`}
// //                     /> */}
// //                     <input
// //     type="text"
// //     name="licenseNumber"
// //     value={formData.licenseNumber}
// //     readOnly
// //     className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-default focus:outline-none focus:ring-0 focus:border-gray-300"
// // />
// //                     {errors.licenseNumber && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.licenseNumber}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-semibold mb-2">
// //                       License Expiry
// //                     </label>
// //                     <input
// //                       type="date"
// //                       name="licenseExpiry"
// //                       value={formData.licenseExpiry}
// //                       readOnly
// //                       tabIndex={-1}
// //                       className={`w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 cursor-default focus:outline-none focus:ring-0 ${
// //                         errors.licenseExpiry
// //                           ? "border-red-500"
// //                           : "border-gray-300"
// //                       }`}
// //                     />
// //                     {errors.licenseExpiry && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.licenseExpiry}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div className="md:col-span-2">
// //                     <label className="block text-sm font-semibold mb-2">
// //                       Aadhaar Number
// //                     </label>
// //                     {/* <input
// //                       type="text"
// //                       name="aadhaarNumber"
// //                       value={formData.aadhaarNumber}
// //                       onChange={handleInputChange}
// //                       placeholder="12 digit Aadhaar number"
// //                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
// //                         errors.aadhaarNumber
// //                           ? "border-red-500"
// //                           : "border-gray-300"
// //                       }`}
// //                     /> */}
// //                     <input
// //     type="text"
// //     name="aadhaarNumber"
// //     value={formData.aadhaarNumber}
// //     readOnly
// //     className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-default focus:outline-none focus:ring-0 focus:border-gray-300"
// // />
// //                     {errors.aadhaarNumber && (
// //                       <p className="text-red-500 text-sm mt-1">
// //                         {errors.aadhaarNumber}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-4">
// //                   <button
// //                     onClick={() => setStep(1)}
// //                     className="btn-outline flex-1"
// //                   >
// //                     Back
// //                   </button>

// //                   <button
// //                     onClick={handleNextStep}
// //                     className="btn-primary flex-1 flex items-center justify-center gap-2"
// //                   >
// //                     Continue <FiArrowRight />
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             )}

// //             {step === 3 && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 className="bg-white p-8 rounded-xl card-shadow"
// //               >
// //                 <h2 className="text-2xl font-bold mb-6">Review Your Booking</h2>

// //                 <div className="space-y-6">
// //                   <div className="border-b pb-6">
// //                     <h3 className="font-bold mb-4">Car Details</h3>

// //                     <div className="flex gap-4">
// //                       <img
// //                         src={getCarImageUrl(car.mainImage)}
// //                         alt={car.name}
// //                         className="w-20 h-18 rounded-lg object-contain bg-gray-100 border"
// //                         onError={(e) => {
// //                           e.target.src = "/placeholder-car.jpg";
// //                         }}
// //                       />

// //                       <div>
// //                         <p className="font-bold text-lg">{car.name}</p>
// //                         <p className="text-gray-600">{car.brand}</p>
// //                         <p className="text-secondary font-bold">
// //                           {formatRupees(car.price)}/day
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="border-b pb-6">
// //                     <h3 className="font-bold mb-4">Trip Details</h3>

// //                     <div className="grid grid-cols-2 gap-4">
// //                       <div>
// //                         <p className="text-gray-600 text-sm">Pickup</p>
// //                         <p className="font-semibold">{formData.pickupDate}</p>
// //                         <p className="text-gray-600">
// //                           {formData.pickupLocation}
// //                         </p>
// //                       </div>

// //                       <div>
// //                         <p className="text-gray-600 text-sm">Dropoff</p>
// //                         <p className="font-semibold">{formData.dropoffDate}</p>
// //                         <p className="text-gray-600">
// //                           {formData.dropoffLocation}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="border-b pb-6">
// //                     <h3 className="font-bold mb-4">Driver Details</h3>

// //                     {formData.tripType === "HIRED_DRIVER" ? (
// //                       <div className="grid grid-cols-2 gap-4">
// //                         <div>
// //                           <p className="text-gray-500 text-sm">Name</p>
// //                           <p className="font-semibold">
// //                             {profileData?.firstName} {profileData?.lastName}
// //                           </p>
// //                         </div>

// //                         <div>
// //                           <p className="text-gray-500 text-sm">Email</p>
// //                           <p className="font-semibold">{profileData?.email}</p>
// //                         </div>

// //                         <div>
// //                           <p className="text-gray-500 text-sm">Phone</p>
// //                           <p className="font-semibold">{profileData?.phone}</p>
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <div className="grid grid-cols-2 gap-4">
// //                         <div>
// //                           <p className="text-gray-500 text-sm">Name</p>
// //                           <p className="font-semibold">
// //                             {formData.firstName} {formData.lastName}
// //                           </p>
// //                         </div>

// //                         <div>
// //                           <p className="text-gray-500 text-sm">Email</p>
// //                           <p className="font-semibold">{formData.email}</p>
// //                         </div>

// //                         <div>
// //                           <p className="text-gray-500 text-sm">Phone</p>
// //                           <p className="font-semibold">{formData.phone}</p>
// //                         </div>

// //                         <div>
// //                           <p className="text-gray-500 text-sm">
// //                             License Number
// //                           </p>
// //                           <p className="font-semibold">
// //                             {formData.licenseNumber}
// //                           </p>
// //                         </div>

// //                         <div>
// //                           <p className="text-gray-500 text-sm">
// //                             License Expiry
// //                           </p>
// //                           <p className="font-semibold">
// //                             {formData.licenseExpiry}
// //                           </p>
// //                         </div>

// //                         <div>
// //                           <p className="text-gray-500 text-sm">
// //                             Aadhaar Number
// //                           </p>
// //                           <p className="font-semibold">
// //                             XXXX XXXX {formData.aadhaarNumber.slice(-4)}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* <div className="flex gap-4 mt-8">
// //                   <button
// //                     onClick={() =>
// //                       setStep(formData.tripType === "HIRED_DRIVER" ? 1 : 2)
// //                     }
// //                     className="btn-outline flex-1"
// //                   >
// //                     Back
// //                   </button>

// //                   <button
// //                     onClick={handleConfirmBooking}
// //                     className="btn-primary flex-1 flex items-center justify-center gap-2"
// //                   >
// //                     <FiCheck /> Confirm Booking
// //                   </button>
// //                 </div> */}
// //    <div className="mt-8 border-t border-gray-200 pt-6">
// //   <div className="flex flex-col gap-3 sm:flex-row">

// //     {/* BACK */}
// //     <button
// //       type="button"
// //       onClick={() =>
// //         setStep(
// //           formData.tripType ===
// //             "HIRED_DRIVER"
// //             ? 1
// //             : 2
// //         )
// //       }
// //       className="flex-1 min-h-[50px] rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400"
// //     >
// //       Back
// //     </button>

// //     {/* WHATSAPP */}
// //     <button
// //       type="button"
// //       onClick={
// //         handleBookViaWhatsApp
// //       }
// //       className="flex-1 min-h-[50px] rounded-lg bg-[#25D366] px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1ebe5d] hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
// //     >
// //       <FiMessageCircle className="text-xl" />

// //       <span>
// //         Book via WhatsApp
// //       </span>
// //     </button>

// //     {/* CONFIRM BOOKING */}
// //     <button
// //       type="button"
// //       onClick={
// //         handleConfirmBooking
// //       }
// //       className="flex-1 min-h-[50px] rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
// //     >
// //       <FiCheck className="text-lg" />

// //       <span>
// //         Confirm Booking
// //       </span>
// //     </button>

// //   </div>

// //   {/* WHATSAPP INFO */}
// //   <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
// //     <FiMessageCircle className="mt-0.5 shrink-0 text-lg text-[#25D366]" />

// //     <div>
// //       <p className="font-semibold text-green-800">
// //         Book quickly through WhatsApp
// //       </p>

// //       <p className="mt-1 text-sm text-green-700">
// //         Your booking details will be prepared
// //         automatically and sent to our rental
// //         team for confirmation.
// //       </p>
// //     </div>
// //   </div>
// // </div>
// //               </motion.div>
// //             )}
// //           </div>

// //           <div className="lg:col-span-1">
// //             <div className="bg-white p-8 rounded-xl card-shadow sticky top-24">
// //               <h3 className="text-xl font-bold mb-6">Booking Summary</h3>

// //               <div className="mb-6 pb-6 border-b">
// //                 {/* <img
// //                   src={car.mainImage}
// //                   alt={car.name}
// //                   className="w-full h-40 rounded-lg object-cover mb-4"
// //                 /> */}
// //                 <img
// //                   src={getCarImageUrl(car.mainImage)}
// //                   alt={car.name}
// //                   className="w-14 h-12 rounded-lg object-contain bg-gray-100 border"
// //                   onError={(e) => {
// //                     e.target.src = "/placeholder-car.jpg";
// //                   }}
// //                 />

// //                 <p className="font-bold text-lg">{car.name}</p>
// //                 <p className="text-gray-600">{car.brand}</p>

// //                 <div className="flex justify-between mt-3">
// //                   <span className="text-gray-600">Trip Type</span>
// //                   <span className="font-semibold">
// //                     {formData.tripType === "SELF_DRIVE"
// //                       ? "Drive Yourself"
// //                       : formData.tripType === "HIRED_DRIVER"
// //                         ? "Hired Driver"
// //                         : "Not Selected"}
// //                   </span>
// //                 </div>
// //               </div>

// //               <div className="space-y-3 mb-6 pb-6 border-b">
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Rental Days</span>
// //                   <span className="font-semibold">{days}</span>
// //                 </div>

// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Daily Rate</span>
// //                   <span className="font-semibold">
// //                     {formatRupees(car.price)}
// //                   </span>
// //                 </div>

// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Subtotal</span>
// //                   <span className="font-semibold">
// //                     {formatRupees(subtotal)}
// //                   </span>
// //                 </div>
// //               </div>

// //               <div className="space-y-3 mb-6 pb-6 border-b">
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Insurance</span>
// //                   <span className="font-semibold">
// //                     {formatRupees(insurance)}
// //                   </span>
// //                 </div>

// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Tax 10%</span>
// //                   <span className="font-semibold">{formatRupees(tax)}</span>
// //                 </div>
// //               </div>

// //               <div className="flex justify-between mb-6">
// //                 <span className="font-bold text-lg">Total</span>
// //                 <span className="text-2xl font-bold text-secondary">
// //                   {formatRupees(total)}
// //                 </span>
// //               </div>

// //               <div className="bg-light p-4 rounded-lg text-sm text-gray-600">
// //                 <p>✓ Full insurance included</p>
// //                 <p>✓ Free cancellation up to 24 hours</p>
// //                 <p>✓ 24/7 roadside assistance</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {showDocumentMessage && (
// //         <div
// //           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
// //           onClick={() => setShowDocumentMessage(false)}
// //         >
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.94, y: 20 }}
// //             animate={{ opacity: 1, scale: 1, y: 0 }}
// //             transition={{ duration: 0.2 }}
// //             onClick={(event) => event.stopPropagation()}
// //             className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
// //           >
// //             <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-6">
// //               <div className="flex items-center gap-3">
// //                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
// //                   <FiAlertCircle className="text-2xl text-red-600" />
// //                 </div>

// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
// //                     Document verification required
// //                   </h3>
// //                   <p className="mt-1 text-sm text-gray-500">
// //                     Self-drive booking is available after document approval.
// //                   </p>
// //                 </div>
// //               </div>

// //               <button
// //                 type="button"
// //                 onClick={() => setShowDocumentMessage(false)}
// //                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
// //                 aria-label="Close document verification message"
// //               >
// //                 <FiX className="text-xl" />
// //               </button>
// //             </div>

// //             <div className="px-5 py-6 sm:px-6">
// //               <div
// //                 className={`rounded-xl border p-4 ${
// //                   documentStatus === "REJECT"
// //                     ? "border-red-200 bg-red-50"
// //                     : documentStatus === "PENDING"
// //                       ? "border-yellow-200 bg-yellow-50"
// //                       : "border-blue-200 bg-blue-50"
// //                 }`}
// //               >
// //                 <div className="flex items-start gap-3">
// //                   <FiFileText
// //                     className={`mt-0.5 shrink-0 text-xl ${
// //                       documentStatus === "REJECT"
// //                         ? "text-red-600"
// //                         : documentStatus === "PENDING"
// //                           ? "text-yellow-600"
// //                           : "text-blue-600"
// //                     }`}
// //                   />

// //                   <div>
// //                     <p className="font-semibold text-gray-900">
// //                       {documentStatus === "REJECT"
// //                         ? "Your documents were rejected"
// //                         : documentStatus === "PENDING"
// //                           ? "Your documents are under review"
// //                           : "Documents have not been uploaded"}
// //                     </p>

// //                     <p className="mt-1 text-sm leading-6 text-gray-600">
// //                       {documentStatus === "REJECT"
// //                         ? "Please review the rejection reason, upload corrected documents from your profile, and wait for administrator approval."
// //                         : documentStatus === "PENDING"
// //                           ? "Your documents have been submitted successfully. Please wait until the administrator approves them."
// //                           : "Please upload your Driving Licence and Aadhaar Card from your profile before continuing with a self-drive booking."}
// //                     </p>

// //                     {documentStatus === "REJECT" &&
// //                       documentData?.reason && (
// //                         <div className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2">
// //                           <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
// //                             Rejection reason
// //                           </p>
// //                           <p className="mt-1 text-sm text-gray-700">
// //                             {documentData.reason}
// //                           </p>
// //                         </div>
// //                       )}
// //                   </div>
// //                 </div>
// //               </div>

// //               <p className="mt-4 text-sm leading-6 text-gray-600">
// //                 After your document status becomes{" "}
// //                 <span className="font-bold text-green-700">ACCEPTED</span>,
// //                 return to this page and continue your booking.
// //               </p>
// //             </div>

// //             <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
// //               <button
// //                 type="button"
// //                 onClick={() => setShowDocumentMessage(false)}
// //                 className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
// //               >
// //                 Stay on Booking
// //               </button>

// //               <button
// //                 type="button"
// //                 onClick={() => {
// //                   setShowDocumentMessage(false);
// //                   navigate("/dashboard", {
// //                     state: {
// //                       activeTab: "documents",
// //                     },
// //                   });
// //                 }}
// //                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
// //               >
// //                 <FiFileText />
// //                 Go to Profile Documents
// //               </button>
// //             </div>
// //           </motion.div>
// //         </div>
// //       )}

// //       {toast && (
// //         <div className="fixed bottom-8 right-8 z-50">
// //           <Toast
// //             message={toast.message}
// //             type={toast.type}
// //             onClose={() => setToast(null)}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Booking;
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FiCheck,
//   FiArrowRight,
//   FiAlertCircle,
//   FiFileText,
//   FiX,
//   FiMessageCircle,
// } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext";
// import { useBooking } from "../context/BookingContext";
// import { calculateDays, calculateTotal, validateEmail } from "../utils/helpers";
// import Toast from "../components/Toast";
// import {
//   getUserByEmail,
//   carBooking,
//   getCarImageUrl,
//   getUserDocuments,
// } from "../services/carService";

// const Booking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { addBooking } = useBooking();

//   const car = location.state?.car;

//   const [toast, setToast] = useState(null);
//   const [step, setStep] = useState(1);
//   const [profileData, setProfileData] = useState(null);
//   const [errors, setErrors] = useState({});

//   const [documentData, setDocumentData] = useState(null);
//   const [documentStatus, setDocumentStatus] = useState("NOT_UPLOADED");
//   const [documentLoading, setDocumentLoading] = useState(true);
//   const [showDocumentMessage, setShowDocumentMessage] = useState(false);

//   const [formData, setFormData] = useState({
//     pickupDate: "",
//     dropoffDate: "",
//     pickupLocation: "",
//     dropoffLocation: "",
//     tripType: "",
//     firstName: user?.firstName || "",
//     lastName: user?.lastName || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     licenseNumber: "",
//     licenseExpiry: "",
//     aadhaarNumber: "",
//     insuranceType: "basic",
//     additionalServices: [],
//   });

//   const formatRupees = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(amount || 0);
//   };

//   const normalizeDocumentStatus = (value) => {
//     const status = String(value || "")
//       .trim()
//       .toUpperCase();

//     if (
//       status === "ACCEPT" ||
//       status === "ACCEPTED" ||
//       status === "APPROVED"
//     ) {
//       return "ACCEPT";
//     }

//     if (status === "REJECT" || status === "REJECTED") {
//       return "REJECT";
//     }

//     if (status === "PENDING" || status === "UNDER_REVIEW") {
//       return "PENDING";
//     }

//     return "NOT_UPLOADED";
//   };

//   const fetchUserDocuments = async () => {
//     try {
//       setDocumentLoading(true);

//       const response = await getUserDocuments();

//       let latestDocument = response?.data ?? response;

//       if (Array.isArray(latestDocument)) {
//         latestDocument =
//           latestDocument.length > 0
//             ? latestDocument[latestDocument.length - 1]
//             : null;
//       }

//       if (!latestDocument) {
//         setDocumentData(null);
//         setDocumentStatus("NOT_UPLOADED");

//         setFormData((previous) => ({
//           ...previous,
//           licenseNumber: "",
//           licenseExpiry: "",
//           aadhaarNumber: "",
//         }));

//         return null;
//       }

//       console.log("User Documents:", latestDocument);

//       const status = normalizeDocumentStatus(
//         latestDocument.status ??
//           latestDocument.documentStatus ??
//           latestDocument.verificationStatus,
//       );

//       const rawLicenseExpiry =
//         latestDocument.licenseExpiry ??
//         latestDocument.drivingLicenseExpiry ??
//         latestDocument.drivingLicenceExpiry ??
//         "";

//       const normalizedLicenseExpiry = rawLicenseExpiry
//         ? String(rawLicenseExpiry).split("T")[0]
//         : "";

//       setDocumentData(latestDocument);
//       setDocumentStatus(status);

//       setFormData((previous) => ({
//         ...previous,

//         licenseNumber:
//           latestDocument.drivingLicenseNo ??
//           latestDocument.drivingLicenseNumber ??
//           latestDocument.drivingLicenceNumber ??
//           latestDocument.licenseNumber ??
//           "",

//         licenseExpiry: normalizedLicenseExpiry,

//         aadhaarNumber:
//           latestDocument.aadharNo ??
//           latestDocument.aadhaarNumber ??
//           latestDocument.aadhaarCardNumber ??
//           latestDocument.aadhharNumber ??
//           "",
//       }));

//       return {
//         data: latestDocument,
//         status,
//       };
//     } catch (error) {
//       console.error(
//         "Document Fetch Error:",
//         error.response?.data || error.message,
//       );

//       setDocumentData(null);
//       setDocumentStatus("NOT_UPLOADED");

//       return null;
//     } finally {
//       setDocumentLoading(false);
//     }
//   };

//   const validateIndianPhone = (phone) => {
//     return /^[6-9]\d{9}$/.test(phone);
//   };

//   const validateAadhaar = (aadhaar) => {
//     return /^\d{12}$/.test(aadhaar);
//   };

//   const validateDrivingLicense = (license) => {
//     return /^[A-Z]{2}\d{2}\s?\d{11}$/.test(license);
//   };

//   const isFutureDate = (date) => {
//     const selectedDate = new Date(date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return selectedDate > today;
//   };

//   const isTodayOrFutureDate = (date) => {
//     const selectedDate = new Date(date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return selectedDate >= today;
//   };

//   // ==========================================
//   // CREATE BOOKING PAYLOAD - SINGLE SOURCE OF TRUTH
//   // ==========================================
//   // const createBookingPayload = () => {
//   //   // Get user ID from localStorage
//   //   const userId = Number(localStorage.getItem("userId"));
    
//   //   // Get car ID - try multiple sources
//   //   const carId = car?.carId ?? car?.id ?? car?.vehicleId;
    
//   //   // Validate required fields
//   //   if (!userId) {
//   //     throw new Error("User ID is missing. Please login again.");
//   //   }
    
//   //   if (!carId) {
//   //     throw new Error("Car ID is missing. Please select the car again.");
//   //   }
    
//   //   if (!formData.pickupDate || !formData.dropoffDate) {
//   //     throw new Error("Please select valid pickup and drop-off dates.");
//   //   }
    
//   //   // Calculate days
//   //   const pickup = new Date(formData.pickupDate);
//   //   const dropoff = new Date(formData.dropoffDate);
//   //   const days = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
    
//   //   if (days <= 0) {
//   //     throw new Error("Dropoff date must be after pickup date.");
//   //   }
    
//   //   // Calculate total
//   //   const pricePerDay = Number(car?.price || 0);
//   //   const total = pricePerDay * days;
    
//   //   // Build the payload matching backend expectations
//   //   const payload = {
//   //     // Required fields from your backend
//   //     userId: userId,
//   //     carId: Number(carId),
      
//   //     // Trip details
//   //     pickupDate: formData.pickupDate,
//   //     dropoffDate: formData.dropoffDate,
//   //     pickupLocation: formData.pickupLocation,
//   //     dropoffLocation: formData.dropoffLocation,
//   //     tripDriverType: formData.tripType || "SELF_DRIVE",
      
//   //     // Pricing
//   //     days: days,
//   //     price: pricePerDay,
//   //     total: total,
      
//   //     // Status
//   //     bookingStatus: "PENDING",
      
//   //     // Additional fields your backend might expect
//   //     tripType: formData.tripType || "SELF_DRIVE", // Some backends use this field name
//   //   };
    
//   //   // Add driver details for self-drive bookings
//   //   if (formData.tripType === "SELF_DRIVE") {
//   //     payload.driverDetails = {
//   //       firstName: formData.firstName || profileData?.firstName || "",
//   //       lastName: formData.lastName || profileData?.lastName || "",
//   //       email: formData.email || profileData?.email || "",
//   //       phone: formData.phone || profileData?.phone || "",
//   //       licenseNumber: formData.licenseNumber || "",
//   //       licenseExpiry: formData.licenseExpiry || "",
//   //       aadhaarNumber: formData.aadhaarNumber || "",
//   //     };
//   //   }
    
//   //   console.log("📦 Booking Payload:", payload);
//   //   return payload;
//   // };
//   // ==========================================
// // CREATE BOOKING PAYLOAD - WITH SOURCE
// // ==========================================
// const createBookingPayload = () => {
//   // Get user ID from localStorage
//   const userId = Number(localStorage.getItem("userId"));
  
//   // Get car ID - try multiple sources
//   const carId = car?.carId ?? car?.id ?? car?.vehicleId;
  
//   // Validate required fields
//   if (!userId) {
//     throw new Error("User ID is missing. Please login again.");
//   }
  
//   if (!carId) {
//     throw new Error("Car ID is missing. Please select the car again.");
//   }
  
//   if (!formData.pickupDate || !formData.dropoffDate) {
//     throw new Error("Please select valid pickup and drop-off dates.");
//   }
  
//   // Calculate days
//   const pickup = new Date(formData.pickupDate);
//   const dropoff = new Date(formData.dropoffDate);
//   const days = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
  
//   if (days <= 0) {
//     throw new Error("Dropoff date must be after pickup date.");
//   }
  
//   // Calculate total
//   const pricePerDay = Number(car?.price || 0);
//   const total = pricePerDay * days;
  
//   // Build the payload matching backend expectations
//   const payload = {
//     // Required fields from your backend
//     userId: userId,
//     carId: Number(carId),
    
//     // Trip details
//     pickupDate: formData.pickupDate,
//     dropoffDate: formData.dropoffDate,
//     pickupLocation: formData.pickupLocation,
//     dropoffLocation: formData.dropoffLocation,
//     tripDriverType: formData.tripType || "SELF_DRIVE",
    
//     // Pricing
//     days: days,
//     price: pricePerDay,
//     total: total,
    
//     // Status
//     bookingStatus: "PENDING",
    
//     // Source - to identify WhatsApp bookings
//     source: "WHATSAPP",
    
//     // Additional fields your backend might expect
//     tripType: formData.tripType || "SELF_DRIVE",
//   };
  
//   // Add driver details for self-drive bookings
//   if (formData.tripType === "SELF_DRIVE") {
//     payload.driverDetails = {
//       firstName: formData.firstName || profileData?.firstName || "",
//       lastName: formData.lastName || profileData?.lastName || "",
//       email: formData.email || profileData?.email || "",
//       phone: formData.phone || profileData?.phone || "",
//       licenseNumber: formData.licenseNumber || "",
//       licenseExpiry: formData.licenseExpiry || "",
//       aadhaarNumber: formData.aadhaarNumber || "",
//     };
//   }
  
//   console.log("📦 Booking Payload:", payload);
//   return payload;
// };

//   // ==========================================
//   // HANDLE CONFIRM BOOKING
//   // ==========================================
//   const handleConfirmBooking = async () => {
//     // Step 1 validation
//     if (!validateStep1()) {
//       setStep(1);
//       return;
//     }

//     // Self-drive validation
//     if (formData.tripType === "SELF_DRIVE" && !validateStep2()) {
//       setStep(2);
//       return;
//     }

//     try {
//       // Create the booking payload
//       const bookingPayload = createBookingPayload();
      
//       console.log("🚀 Sending booking payload:", bookingPayload);
      
//       // Send to backend
//       const response = await carBooking(bookingPayload);
      
//       console.log("✅ Booking API response:", response);
      
//       // Handle different response formats
//       if (response?.data?.bookingId || response?.bookingId) {
//         // Success - add to context
//         const bookingData = response.data || response;
//         addBooking(bookingData);
        
//         setToast({
//           message: "Booking request sent to admin successfully!",
//           type: "success",
//         });
        
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 2000);
//       } else if (Array.isArray(response)) {
//         // If response is an array (your existing code handles this)
//         const latestBooking = response[response.length - 1];
//         if (latestBooking) {
//           addBooking(latestBooking);
//         }
        
//         setToast({
//           message: "Booking request sent to admin successfully!",
//           type: "success",
//         });
        
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 2000);
//       } else {
//         // Handle unexpected response
//         console.warn("⚠️ Unexpected response format:", response);
//         setToast({
//           message: "Booking request sent, but received unexpected response.",
//           type: "warning",
//         });
//       }
//     } catch (error) {
//       console.error("❌ Booking Error:", error);
      
//       const errorMessage = error?.response?.data?.message || 
//                           error?.response?.data || 
//                           error?.message || 
//                           "Booking failed!";
      
//       setToast({
//         message: errorMessage,
//         type: "error",
//       });
//     }
//   };

//   // ==========================================
//   // HANDLE BOOK VIA WHATSAPP
//   // ==========================================
// //   const handleBookViaWhatsApp = () => {
// //     try {
// //       // Validate booking first
// //       if (!validateStep1()) {
// //         setStep(1);
// //         setToast({
// //           message: "Please complete all booking details first.",
// //           type: "error",
// //         });
// //         return;
// //       }
      
// //       if (formData.tripType === "SELF_DRIVE" && !validateStep2()) {
// //         setStep(2);
// //         setToast({
// //           message: "Please complete the driver details.",
// //           type: "error",
// //         });
// //         return;
// //       }
      
// //       // Get booking data (same as confirm booking)
// //       const bookingData = createBookingPayload();
      
// //       // Customer information
// //       const firstName = formData.firstName || profileData?.firstName || "";
// //       const lastName = formData.lastName || profileData?.lastName || "";
// //       const email = formData.email || profileData?.email || "";
// //       const phone = formData.phone || profileData?.phone || "";
// //       const customerName = `${firstName} ${lastName}`.trim();
      
// //       // Trip type display
// //       const tripTypeDisplay = bookingData.tripDriverType === "SELF_DRIVE" 
// //         ? "Drive Yourself" 
// //         : bookingData.tripDriverType === "HIRED_DRIVER"
// //           ? "Hired Driver"
// //           : bookingData.tripDriverType;
      
// //       // Mask Aadhaar - NEVER send complete Aadhaar to WhatsApp
// //       let maskedAadhaar = "Not Provided";
// //       const aadhaarNumber = formData.aadhaarNumber || "";
// //       if (aadhaarNumber.length >= 4) {
// //         maskedAadhaar = `XXXX XXXX ${aadhaarNumber.slice(-4)}`;
// //       }
      
// //       // Build WhatsApp message
// //       const message = `
// // 🚗 *NEW CAR BOOKING REQUEST*

// // ━━━━━━━━━━━━━━━━━━━━
// // 🚘 *CAR DETAILS*
// // ━━━━━━━━━━━━━━━━━━━━

// // Car: ${car?.name || "N/A"}
// // Brand: ${car?.brand || "N/A"}
// // Car ID: ${bookingData.carId}
// // Daily Rate: ${formatRupees(bookingData.price)}

// // ━━━━━━━━━━━━━━━━━━━━
// // 📅 *TRIP DETAILS*
// // ━━━━━━━━━━━━━━━━━━━━

// // Pickup Date: ${bookingData.pickupDate}
// // Dropoff Date: ${bookingData.dropoffDate}
// // Pickup Location: ${bookingData.pickupLocation}
// // Dropoff Location: ${bookingData.dropoffLocation}
// // Trip Type: ${tripTypeDisplay}
// // Rental Days: ${bookingData.days}

// // ━━━━━━━━━━━━━━━━━━━━
// // 👤 *CUSTOMER DETAILS*
// // ━━━━━━━━━━━━━━━━━━━━

// // User ID: ${bookingData.userId}
// // Name: ${customerName || "N/A"}
// // Email: ${email || "N/A"}
// // Phone: ${phone || "N/A"}

// // ${bookingData.tripDriverType === "SELF_DRIVE" ? `
// // ━━━━━━━━━━━━━━━━━━━━
// // 🪪 *DRIVER DETAILS*
// // ━━━━━━━━━━━━━━━━━━━━

// // License Number: ${formData.licenseNumber || "N/A"}
// // License Expiry: ${formData.licenseExpiry || "N/A"}
// // Aadhaar: ${maskedAadhaar}
// // ` : ""}

// // ━━━━━━━━━━━━━━━━━━━━
// // 💰 *BOOKING SUMMARY*
// // ━━━━━━━━━━━━━━━━━━━━

// // Daily Rate: ${formatRupees(bookingData.price)}
// // Total: ${formatRupees(bookingData.total)}
// // Booking Status: ${bookingData.bookingStatus}

// // ━━━━━━━━━━━━━━━━━━━━

// // Please confirm my car booking.

// // Thank you.
// // `.trim();
      
// //       console.log("📱 WhatsApp Message:", message);
      
// //       // Business WhatsApp number
// //       const whatsappNumber = "918378891656";
// //       const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
// //       // Open WhatsApp
// //       window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      
// //     } catch (error) {
// //       console.error("❌ WhatsApp Booking Error:", error);
// //       setToast({
// //         message: error?.message || "Unable to prepare WhatsApp booking.",
// //         type: "error",
// //       });
// //     }
// //   };
// // ==========================================
// // HANDLE BOOK VIA WHATSAPP - WITH DATABASE STORE
// // ==========================================
// const handleBookViaWhatsApp = async () => {
//   // ==========================================
//   // STEP 1 VALIDATION
//   // ==========================================
//   if (!validateStep1()) {
//     setStep(1);
//     setToast({
//       message: "Please complete all booking details first.",
//       type: "error",
//     });
//     return;
//   }

//   // ==========================================
//   // SELF DRIVE VALIDATION
//   // ==========================================
//   if (formData.tripType === "SELF_DRIVE" && !validateStep2()) {
//     setStep(2);
//     setToast({
//       message: "Please complete the driver details.",
//       type: "error",
//     });
//     return;
//   }

//   try {
//     // ========================================
//     // CREATE BOOKING PAYLOAD
//     // ========================================
//     const bookingPayload = createBookingPayload();
    
//     console.log("📦 WhatsApp Booking Payload:", bookingPayload);

//     // ========================================
//     // STEP 1: STORE BOOKING IN DATABASE FIRST
//     // ========================================
//     console.log("💾 Saving booking to database...");
    
//     const response = await carBooking(bookingPayload);
    
//     console.log("✅ Booking saved to database:", response);

//     // ========================================
//     // STEP 2: CHECK IF BOOKING WAS SUCCESSFUL
//     // ========================================
//     let bookingId = null;
//     let bookingData = null;

//     if (response?.data?.bookingId || response?.bookingId) {
//       bookingData = response.data || response;
//       bookingId = bookingData.bookingId || bookingData.id;
      
//       // Add to booking context
//       addBooking(bookingData);
//     } else if (Array.isArray(response)) {
//       const latestBooking = response[response.length - 1];
//       if (latestBooking) {
//         bookingData = latestBooking;
//         bookingId = latestBooking.bookingId || latestBooking.id;
//         addBooking(latestBooking);
//       }
//     }

//     // ========================================
//     // STEP 3: IF SAVED SUCCESSFULLY, OPEN WHATSAPP
//     // ========================================
//     if (bookingId) {
//       console.log("📱 Booking ID:", bookingId, " - Opening WhatsApp...");
      
//       // Build WhatsApp message with booking details
//       const message = buildWhatsAppMessage(bookingPayload, bookingData);
      
//       // Business WhatsApp number
//       const whatsappNumber = "918378891656";
//       const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
//       // Open WhatsApp
//       window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      
//       // Show success toast
//       setToast({
//         message: "Booking saved successfully! Redirecting to WhatsApp...",
//         type: "success",
//       });

//       // Optional: Navigate to dashboard after delay
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 3000);
      
//     } else {
//       throw new Error("Booking was not saved properly. Please try again.");
//     }

//   } catch (error) {
//     console.error("❌ WhatsApp Booking Error:", error);
    
//     // ========================================
//     // HANDLE DUPLICATE BOOKING ERROR
//     // ========================================
//     let errorMessage = error?.message || "Unable to process booking.";
    
//     // Check if it's a duplicate booking error
//     if (errorMessage.toLowerCase().includes("already booked") || 
//         errorMessage.toLowerCase().includes("duplicate") ||
//         errorMessage.toLowerCase().includes("conflict")) {
//       errorMessage = "This car is already booked for the selected dates. Please choose different dates.";
//     }
    
//     setToast({
//       message: errorMessage,
//       type: "error",
//     });
//   }
// };

// // ==========================================
// // BUILD WHATSAPP MESSAGE FUNCTION
// // ==========================================
// const buildWhatsAppMessage = (bookingPayload, bookingData) => {
//   // Customer information
//   const firstName = formData.firstName || profileData?.firstName || "";
//   const lastName = formData.lastName || profileData?.lastName || "";
//   const email = formData.email || profileData?.email || "";
//   const phone = formData.phone || profileData?.phone || "";
//   const customerName = `${firstName} ${lastName}`.trim();
  
//   // Trip type display
//   const tripTypeDisplay = bookingPayload.tripDriverType === "SELF_DRIVE" 
//     ? "Drive Yourself" 
//     : bookingPayload.tripDriverType === "HIRED_DRIVER"
//       ? "Hired Driver"
//       : bookingPayload.tripDriverType;
  
//   // Mask Aadhaar - NEVER send complete Aadhaar to WhatsApp
//   let maskedAadhaar = "Not Provided";
//   const aadhaarNumber = formData.aadhaarNumber || "";
//   if (aadhaarNumber.length >= 4) {
//     maskedAadhaar = `XXXX XXXX ${aadhaarNumber.slice(-4)}`;
//   }
  
//   // Get booking ID from response
//   const bookingId = bookingData?.bookingId || bookingData?.id || bookingPayload?.bookingId || "N/A";
  
//   // Build WhatsApp message
//   const message = `
// 🚗 *NEW CAR BOOKING REQUEST*

// ━━━━━━━━━━━━━━━━━━━━
// 📋 *BOOKING REFERENCE*
// ━━━━━━━━━━━━━━━━━━━━

// Booking ID: ${bookingId}
// Status: ${bookingPayload.bookingStatus || "PENDING"}

// ━━━━━━━━━━━━━━━━━━━━
// 🚘 *CAR DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// Car: ${car?.name || "N/A"}
// Brand: ${car?.brand || "N/A"}
// Car ID: ${bookingPayload.carId}
// Daily Rate: ${formatRupees(bookingPayload.price)}

// ━━━━━━━━━━━━━━━━━━━━
// 📅 *TRIP DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// Pickup Date: ${bookingPayload.pickupDate}
// Dropoff Date: ${bookingPayload.dropoffDate}
// Pickup Location: ${bookingPayload.pickupLocation}
// Dropoff Location: ${bookingPayload.dropoffLocation}
// Trip Type: ${tripTypeDisplay}
// Rental Days: ${bookingPayload.days}

// ━━━━━━━━━━━━━━━━━━━━
// 👤 *CUSTOMER DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// User ID: ${bookingPayload.userId}
// Name: ${customerName || "N/A"}
// Email: ${email || "N/A"}
// Phone: ${phone || "N/A"}

// ${bookingPayload.tripDriverType === "SELF_DRIVE" ? `
// ━━━━━━━━━━━━━━━━━━━━
// 🪪 *DRIVER DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// License Number: ${formData.licenseNumber || "N/A"}
// License Expiry: ${formData.licenseExpiry || "N/A"}
// Aadhaar: ${maskedAadhaar}
// ` : ""}

// ━━━━━━━━━━━━━━━━━━━━
// 💰 *BOOKING SUMMARY*
// ━━━━━━━━━━━━━━━━━━━━

// Daily Rate: ${formatRupees(bookingPayload.price)}
// Total: ${formatRupees(bookingPayload.total)}
// Booking Status: ${bookingPayload.bookingStatus || "PENDING"}

// ━━━━━━━━━━━━━━━━━━━━

// Please confirm my car booking.

// Thank you.
// `.trim();
  
//   return message;
// };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     console.log("Changed field:", name);
//     console.log("Changed value:", value);

//     let finalValue = value;

//     if (name === "aadhaarNumber") {
//       finalValue = value.replace(/\D/g, "").slice(0, 12);
//     }

//     if (name === "phone") {
//       finalValue = value.replace(/\D/g, "").slice(0, 10);
//     }

//     if (name === "licenseNumber") {
//       finalValue = value.toUpperCase().slice(0, 16);
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: finalValue,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateStep1 = () => {
//     const newErrors = {};

//     if (!formData.pickupDate) {
//       newErrors.pickupDate = "Pickup date is required";
//     } else if (!isTodayOrFutureDate(formData.pickupDate)) {
//       newErrors.pickupDate = "Pickup date cannot be past date";
//     }

//     if (!formData.dropoffDate) {
//       newErrors.dropoffDate = "Dropoff date is required";
//     }

//     if (formData.pickupDate && formData.dropoffDate) {
//       const pickup = new Date(formData.pickupDate);
//       const dropoff = new Date(formData.dropoffDate);

//       if (dropoff <= pickup) {
//         newErrors.dropoffDate = "Dropoff date must be after pickup date";
//       }
//     }

//     if (!formData.pickupLocation) {
//       newErrors.pickupLocation = "Pickup location is required";
//     }

//     if (!formData.dropoffLocation) {
//       newErrors.dropoffLocation = "Dropoff location is required";
//     }

//     if (!formData.tripType) {
//       newErrors.tripType = "Trip type is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateStep2 = () => {
//     const newErrors = {};

//     if (!formData.firstName.trim()) {
//       newErrors.firstName = "First name is required";
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//     }

//     if (!validateEmail(formData.email)) {
//       newErrors.email = "Valid email is required";
//     }

//     if (!validateIndianPhone(formData.phone)) {
//       newErrors.phone =
//         "Enter valid 10 digit Indian mobile number starting with 6, 7, 8, or 9";
//     }

//     if (!formData.licenseNumber.trim()) {
//       newErrors.licenseNumber = "Driving license number is required";
//     } else if (!validateDrivingLicense(formData.licenseNumber)) {
//       newErrors.licenseNumber =
//         "Enter valid license number. Example: MH12 20230012345";
//     }

//     if (!formData.licenseExpiry) {
//       newErrors.licenseExpiry = "License expiry date is required";
//     } else if (!isFutureDate(formData.licenseExpiry)) {
//       newErrors.licenseExpiry = "Driving license must not be expired";
//     }

//     if (!formData.aadhaarNumber) {
//       newErrors.aadhaarNumber = "Aadhaar number is required";
//     } else if (!validateAadhaar(formData.aadhaarNumber)) {
//       newErrors.aadhaarNumber = "Aadhaar number must be exactly 12 digits";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNextStep = async () => {
//     if (step === 1) {
//       if (!validateStep1()) {
//         return;
//       }

//       if (formData.tripType === "HIRED_DRIVER") {
//         setStep(3);
//         return;
//       }

//       /*
//        * Self-drive bookings require approved documents.
//        * Fetch again here so the latest admin status is always checked.
//        */
//       const latestDocumentResult = await fetchUserDocuments();
//       const latestStatus =
//         latestDocumentResult?.status || documentStatus;

//       if (latestStatus !== "ACCEPT") {
//         setShowDocumentMessage(true);
//         return;
//       }

//       setStep(2);
//       return;
//     }

//     if (step === 2 && validateStep2()) {
//       setStep(3);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//     fetchUserDocuments();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const email = localStorage.getItem("email");
//       const data = await getUserByEmail(email);

//       setProfileData(data);

//       setFormData((prev) => ({
//         ...prev,
//         firstName: data?.firstName || prev.firstName,
//         lastName: data?.lastName || prev.lastName,
//         email: data?.email || prev.email,
//         phone: data?.phone || prev.phone,
//       }));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!car) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-4">No Car Selected</h1>
//           <button onClick={() => navigate("/cars")} className="btn-primary">
//             Back to Cars
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const days = calculateDays(formData.pickupDate, formData.dropoffDate);
//   const subtotal = calculateTotal(car.price, days);
//   const insurance =
//     formData.insuranceType === "premium" ? subtotal * 0.1 : subtotal * 0.05;
//   const tax = (subtotal + insurance) * 0.1;
//   const total = subtotal + insurance + tax;

//   const locations = ["Mumbai", "Pune", "Nashik", "Nagpur", "Nandurbar"];

//   return (
//     <div className="min-h-screen bg-light py-8">
//       <div className="container-custom">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="flex gap-4 mb-8">
//               {[1, 2, 3].map((s) => (
//                 <div key={s} className="flex items-center gap-2">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
//                       s <= step
//                         ? "bg-secondary text-white"
//                         : "bg-gray-300 text-gray-600"
//                     }`}
//                   >
//                     {s < step ? <FiCheck /> : s}
//                   </div>

//                   {s < 3 && (
//                     <div
//                       className={`w-12 h-1 transition-all ${
//                         s < step ? "bg-secondary" : "bg-gray-300"
//                       }`}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>

//             {step === 1 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white p-8 rounded-xl card-shadow"
//               >
//                 <h2 className="text-2xl font-bold mb-6">Trip Details</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Pickup Date
//                     </label>
//                     <input
//                       type="date"
//                       name="pickupDate"
//                       value={formData.pickupDate}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.pickupDate ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.pickupDate && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.pickupDate}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Dropoff Date
//                     </label>
//                     <input
//                       type="date"
//                       name="dropoffDate"
//                       value={formData.dropoffDate}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.dropoffDate
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                     {errors.dropoffDate && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.dropoffDate}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Pickup Location
//                     </label>
//                     <select
//                       name="pickupLocation"
//                       value={formData.pickupLocation}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.pickupLocation
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       <option value="">Select Location</option>
//                       {locations.map((loc) => (
//                         <option key={loc} value={loc}>
//                           {loc}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.pickupLocation && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.pickupLocation}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Dropoff Location
//                     </label>
//                     <select
//                       name="dropoffLocation"
//                       value={formData.dropoffLocation}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.dropoffLocation
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       <option value="">Select Location</option>
//                       {locations.map((loc) => (
//                         <option key={loc} value={loc}>
//                           {loc}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.dropoffLocation && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.dropoffLocation}
//                       </p>
//                     )}
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold mb-2">
//                       Trip Type
//                     </label>

//                     <select
//                       name="tripType"
//                       value={formData.tripType}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.tripType ? "border-red-500" : "border-gray-300"
//                       }`}
//                     >
//                       <option value="">Select Trip Type</option>
//                       <option value="SELF_DRIVE">Drive Yourself</option>
//                       <option value="HIRED_DRIVER">Hired Driver</option>
//                     </select>

//                     {errors.tripType && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.tripType}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleNextStep}
//                   disabled={documentLoading}
//                   className="btn-primary w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {documentLoading ? (
//                     <>
//                       <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                       Checking Documents...
//                     </>
//                   ) : (
//                     <>
//                       Continue <FiArrowRight />
//                     </>
//                   )}
//                 </button>
//               </motion.div>
//             )}

//             {step === 2 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white p-8 rounded-xl card-shadow"
//               >
//                 <h2 className="text-2xl font-bold mb-6">Driver Information</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.firstName ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.firstName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.firstName}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.lastName ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.lastName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.lastName}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.email ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       placeholder="10 digit mobile number"
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.phone ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.phone && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.phone}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Driving License Number
//                     </label>
//                     <input
//                       type="text"
//                       name="licenseNumber"
//                       value={formData.licenseNumber}
//                       onChange={handleInputChange}
//                       placeholder="Example: MH12 20230012345"
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.licenseNumber
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                     {errors.licenseNumber && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.licenseNumber}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       License Expiry
//                     </label>
//                     <input
//                       type="date"
//                       name="licenseExpiry"
//                       value={formData.licenseExpiry}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.licenseExpiry
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                     {errors.licenseExpiry && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.licenseExpiry}
//                       </p>
//                     )}
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold mb-2">
//                       Aadhaar Number
//                     </label>
//                     <input
//                       type="text"
//                       name="aadhaarNumber"
//                       value={formData.aadhaarNumber}
//                       onChange={handleInputChange}
//                       placeholder="12 digit Aadhaar number"
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.aadhaarNumber
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                     {errors.aadhaarNumber && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.aadhaarNumber}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => setStep(1)}
//                     className="btn-outline flex-1"
//                   >
//                     Back
//                   </button>

//                   <button
//                     onClick={handleNextStep}
//                     className="btn-primary flex-1 flex items-center justify-center gap-2"
//                   >
//                     Continue <FiArrowRight />
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {step === 3 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white p-8 rounded-xl card-shadow"
//               >
//                 <h2 className="text-2xl font-bold mb-6">Review Your Booking</h2>

//                 <div className="space-y-6">
//                   <div className="border-b pb-6">
//                     <h3 className="font-bold mb-4">Car Details</h3>

//                     <div className="flex gap-4">
//                       <img
//                         src={getCarImageUrl(car.mainImage)}
//                         alt={car.name}
//                         className="w-20 h-18 rounded-lg object-contain bg-gray-100 border"
//                         onError={(e) => {
//                           e.target.src = "/placeholder-car.jpg";
//                         }}
//                       />

//                       <div>
//                         <p className="font-bold text-lg">{car.name}</p>
//                         <p className="text-gray-600">{car.brand}</p>
//                         <p className="text-secondary font-bold">
//                           {formatRupees(car.price)}/day
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-b pb-6">
//                     <h3 className="font-bold mb-4">Trip Details</h3>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-gray-600 text-sm">Pickup</p>
//                         <p className="font-semibold">{formData.pickupDate}</p>
//                         <p className="text-gray-600">
//                           {formData.pickupLocation}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-gray-600 text-sm">Dropoff</p>
//                         <p className="font-semibold">{formData.dropoffDate}</p>
//                         <p className="text-gray-600">
//                           {formData.dropoffLocation}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-b pb-6">
//                     <h3 className="font-bold mb-4">Driver Details</h3>

//                     {formData.tripType === "HIRED_DRIVER" ? (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-gray-500 text-sm">Name</p>
//                           <p className="font-semibold">
//                             {profileData?.firstName} {profileData?.lastName}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">Email</p>
//                           <p className="font-semibold">{profileData?.email}</p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">Phone</p>
//                           <p className="font-semibold">{profileData?.phone}</p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-gray-500 text-sm">Name</p>
//                           <p className="font-semibold">
//                             {formData.firstName} {formData.lastName}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">Email</p>
//                           <p className="font-semibold">{formData.email}</p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">Phone</p>
//                           <p className="font-semibold">{formData.phone}</p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             License Number
//                           </p>
//                           <p className="font-semibold">
//                             {formData.licenseNumber}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             License Expiry
//                           </p>
//                           <p className="font-semibold">
//                             {formData.licenseExpiry}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             Aadhaar Number
//                           </p>
//                           <p className="font-semibold">
//                             XXXX XXXX {formData.aadhaarNumber.slice(-4)}
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-8 border-t border-gray-200 pt-6">
//                   <div className="flex flex-col gap-3 sm:flex-row">
//                     {/* BACK */}
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setStep(
//                           formData.tripType ===
//                             "HIRED_DRIVER"
//                             ? 1
//                             : 2
//                         )
//                       }
//                       className="flex-1 min-h-[50px] rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400"
//                     >
//                       Back
//                     </button>

//                     {/* WHATSAPP */}
//                     <button
//                       type="button"
//                       onClick={
//                         handleBookViaWhatsApp
//                       }
//                       className="flex-1 min-h-[50px] rounded-lg bg-[#25D366] px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1ebe5d] hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
//                     >
//                       <FiMessageCircle className="text-xl" />

//                       <span>
//                         Book via WhatsApp
//                       </span>
//                     </button>

//                     {/* CONFIRM BOOKING */}
//                     <button
//                       type="button"
//                       onClick={
//                         handleConfirmBooking
//                       }
//                       className="flex-1 min-h-[50px] rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
//                     >
//                       <FiCheck className="text-lg" />

//                       <span>
//                         Confirm Booking
//                       </span>
//                     </button>
//                   </div>

//                   {/* WHATSAPP INFO */}
//                   <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
//                     <FiMessageCircle className="mt-0.5 shrink-0 text-lg text-[#25D366]" />

//                     <div>
//                       <p className="font-semibold text-green-800">
//                         Book quickly through WhatsApp
//                       </p>

//                       <p className="mt-1 text-sm text-green-700">
//                         Your booking details will be prepared
//                         automatically and sent to our rental
//                         team for confirmation.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white p-8 rounded-xl card-shadow sticky top-24">
//               <h3 className="text-xl font-bold mb-6">Booking Summary</h3>

//               <div className="mb-6 pb-6 border-b">
//                 <img
//                   src={getCarImageUrl(car.mainImage)}
//                   alt={car.name}
//                   className="w-14 h-12 rounded-lg object-contain bg-gray-100 border"
//                   onError={(e) => {
//                     e.target.src = "/placeholder-car.jpg";
//                   }}
//                 />

//                 <p className="font-bold text-lg">{car.name}</p>
//                 <p className="text-gray-600">{car.brand}</p>

//                 <div className="flex justify-between mt-3">
//                   <span className="text-gray-600">Trip Type</span>
//                   <span className="font-semibold">
//                     {formData.tripType === "SELF_DRIVE"
//                       ? "Drive Yourself"
//                       : formData.tripType === "HIRED_DRIVER"
//                         ? "Hired Driver"
//                         : "Not Selected"}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-3 mb-6 pb-6 border-b">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Rental Days</span>
//                   <span className="font-semibold">{days}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Daily Rate</span>
//                   <span className="font-semibold">
//                     {formatRupees(car.price)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-semibold">
//                     {formatRupees(subtotal)}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-3 mb-6 pb-6 border-b">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Insurance</span>
//                   <span className="font-semibold">
//                     {formatRupees(insurance)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax 10%</span>
//                   <span className="font-semibold">{formatRupees(tax)}</span>
//                 </div>
//               </div>

//               <div className="flex justify-between mb-6">
//                 <span className="font-bold text-lg">Total</span>
//                 <span className="text-2xl font-bold text-secondary">
//                   {formatRupees(total)}
//                 </span>
//               </div>

//               <div className="bg-light p-4 rounded-lg text-sm text-gray-600">
//                 <p>✓ Full insurance included</p>
//                 <p>✓ Free cancellation up to 24 hours</p>
//                 <p>✓ 24/7 roadside assistance</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showDocumentMessage && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
//           onClick={() => setShowDocumentMessage(false)}
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.94, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={(event) => event.stopPropagation()}
//             className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
//           >
//             <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
//                   <FiAlertCircle className="text-2xl text-red-600" />
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
//                     Document verification required
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Self-drive booking is available after document approval.
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setShowDocumentMessage(false)}
//                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
//                 aria-label="Close document verification message"
//               >
//                 <FiX className="text-xl" />
//               </button>
//             </div>

//             <div className="px-5 py-6 sm:px-6">
//               <div
//                 className={`rounded-xl border p-4 ${
//                   documentStatus === "REJECT"
//                     ? "border-red-200 bg-red-50"
//                     : documentStatus === "PENDING"
//                       ? "border-yellow-200 bg-yellow-50"
//                       : "border-blue-200 bg-blue-50"
//                 }`}
//               >
//                 <div className="flex items-start gap-3">
//                   <FiFileText
//                     className={`mt-0.5 shrink-0 text-xl ${
//                       documentStatus === "REJECT"
//                         ? "text-red-600"
//                         : documentStatus === "PENDING"
//                           ? "text-yellow-600"
//                           : "text-blue-600"
//                     }`}
//                   />

//                   <div>
//                     <p className="font-semibold text-gray-900">
//                       {documentStatus === "REJECT"
//                         ? "Your documents were rejected"
//                         : documentStatus === "PENDING"
//                           ? "Your documents are under review"
//                           : "Documents have not been uploaded"}
//                     </p>

//                     <p className="mt-1 text-sm leading-6 text-gray-600">
//                       {documentStatus === "REJECT"
//                         ? "Please review the rejection reason, upload corrected documents from your profile, and wait for administrator approval."
//                         : documentStatus === "PENDING"
//                           ? "Your documents have been submitted successfully. Please wait until the administrator approves them."
//                           : "Please upload your Driving Licence and Aadhaar Card from your profile before continuing with a self-drive booking."}
//                     </p>

//                     {documentStatus === "REJECT" &&
//                       documentData?.reason && (
//                         <div className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2">
//                           <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
//                             Rejection reason
//                           </p>
//                           <p className="mt-1 text-sm text-gray-700">
//                             {documentData.reason}
//                           </p>
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               </div>

//               <p className="mt-4 text-sm leading-6 text-gray-600">
//                 After your document status becomes{" "}
//                 <span className="font-bold text-green-700">ACCEPTED</span>,
//                 return to this page and continue your booking.
//               </p>
//             </div>

//             <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
//               <button
//                 type="button"
//                 onClick={() => setShowDocumentMessage(false)}
//                 className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
//               >
//                 Stay on Booking
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowDocumentMessage(false);
//                   navigate("/dashboard", {
//                     state: {
//                       activeTab: "documents",
//                     },
//                   });
//                 }}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
//               >
//                 <FiFileText />
//                 Go to Profile Documents
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {toast && (
//         <div className="fixed bottom-8 right-8 z-50">
//           <Toast
//             message={toast.message}
//             type={toast.type}
//             onClose={() => setToast(null)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FiCheck,
//   FiArrowRight,
//   FiAlertCircle,
//   FiFileText,
//   FiX,
//   FiMessageCircle,
// } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext";
// import { useBooking } from "../context/BookingContext";
// import { calculateDays, calculateTotal, validateEmail } from "../utils/helpers";
// import Toast from "../components/Toast";
// import {
//   getUserByEmail,
//   carBooking,
//   getCarImageUrl,
//   getUserDocuments,
//   createWhatsAppBooking,
// } from "../services/carService";

// const Booking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { addBooking } = useBooking();

//   const car = location.state?.car;

//   const [toast, setToast] = useState(null);
//   const [step, setStep] = useState(1);
//   const [profileData, setProfileData] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const [documentData, setDocumentData] = useState(null);
//   const [documentStatus, setDocumentStatus] = useState("NOT_UPLOADED");
//   const [documentLoading, setDocumentLoading] = useState(true);
//   const [showDocumentMessage, setShowDocumentMessage] = useState(false);

//   const [formData, setFormData] = useState({
//     pickupDate: "",
//     dropoffDate: "",
//     pickupLocation: "",
//     dropoffLocation: "",
//     tripType: "",
//     firstName: user?.firstName || "",
//     lastName: user?.lastName || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     licenseNumber: "",
//     licenseExpiry: "",
//     aadhaarNumber: "",
//     insuranceType: "basic",
//     additionalServices: [],
//   });

//   const formatRupees = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(amount || 0);
//   };

//   const normalizeDocumentStatus = (value) => {
//     const status = String(value || "")
//       .trim()
//       .toUpperCase();

//     if (
//       status === "ACCEPT" ||
//       status === "ACCEPTED" ||
//       status === "APPROVED"
//     ) {
//       return "ACCEPT";
//     }

//     if (status === "REJECT" || status === "REJECTED") {
//       return "REJECT";
//     }

//     if (status === "PENDING" || status === "UNDER_REVIEW") {
//       return "PENDING";
//     }

//     return "NOT_UPLOADED";
//   };

//   const fetchUserDocuments = async () => {
//     try {
//       setDocumentLoading(true);

//       const response = await getUserDocuments();

//       let latestDocument = response?.data ?? response;

//       if (Array.isArray(latestDocument)) {
//         latestDocument =
//           latestDocument.length > 0
//             ? latestDocument[latestDocument.length - 1]
//             : null;
//       }

//       if (!latestDocument) {
//         setDocumentData(null);
//         setDocumentStatus("NOT_UPLOADED");

//         setFormData((previous) => ({
//           ...previous,
//           licenseNumber: "",
//           licenseExpiry: "",
//           aadhaarNumber: "",
//         }));

//         return null;
//       }

//       console.log("User Documents:", latestDocument);

//       const status = normalizeDocumentStatus(
//         latestDocument.status ??
//           latestDocument.documentStatus ??
//           latestDocument.verificationStatus,
//       );

//       const rawLicenseExpiry =
//         latestDocument.licenseExpiry ??
//         latestDocument.drivingLicenseExpiry ??
//         latestDocument.drivingLicenceExpiry ??
//         "";

//       const normalizedLicenseExpiry = rawLicenseExpiry
//         ? String(rawLicenseExpiry).split("T")[0]
//         : "";

//       setDocumentData(latestDocument);
//       setDocumentStatus(status);

//       setFormData((previous) => ({
//         ...previous,

//         licenseNumber:
//           latestDocument.drivingLicenseNo ??
//           latestDocument.drivingLicenseNumber ??
//           latestDocument.drivingLicenceNumber ??
//           latestDocument.licenseNumber ??
//           "",

//         licenseExpiry: normalizedLicenseExpiry,

//         aadhaarNumber:
//           latestDocument.aadharNo ??
//           latestDocument.aadhaarNumber ??
//           latestDocument.aadhaarCardNumber ??
//           latestDocument.aadhharNumber ??
//           "",
//       }));

//       return {
//         data: latestDocument,
//         status,
//       };
//     } catch (error) {
//       console.error(
//         "Document Fetch Error:",
//         error.response?.data || error.message,
//       );

//       setDocumentData(null);
//       setDocumentStatus("NOT_UPLOADED");

//       return null;
//     } finally {
//       setDocumentLoading(false);
//     }
//   };

//   const validateIndianPhone = (phone) => {
//     return /^[6-9]\d{9}$/.test(phone);
//   };

//   const validateAadhaar = (aadhaar) => {
//     return /^\d{12}$/.test(aadhaar);
//   };

//   const validateDrivingLicense = (license) => {
//     return /^[A-Z]{2}\d{2}\s?\d{11}$/.test(license);
//   };

//   const isFutureDate = (date) => {
//     const selectedDate = new Date(date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return selectedDate > today;
//   };

//   const isTodayOrFutureDate = (date) => {
//     const selectedDate = new Date(date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return selectedDate >= today;
//   };

//   // ==========================================
//   // CREATE BOOKING PAYLOAD - SINGLE SOURCE OF TRUTH
//   // ==========================================
//   const createBookingPayload = () => {
//     // Get user ID from localStorage
//     const userId = Number(localStorage.getItem("userId"));
    
//     // Get car ID - try multiple sources
//     const carId = car?.carId ?? car?.id ?? car?.vehicleId;
    
//     // Validate required fields
//     if (!userId) {
//       throw new Error("User ID is missing. Please login again.");
//     }
    
//     if (!carId) {
//       throw new Error("Car ID is missing. Please select the car again.");
//     }
    
//     if (!formData.pickupDate || !formData.dropoffDate) {
//       throw new Error("Please select valid pickup and drop-off dates.");
//     }
    
//     // Calculate days
//     const pickup = new Date(formData.pickupDate);
//     const dropoff = new Date(formData.dropoffDate);
//     const days = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
    
//     if (days <= 0) {
//       throw new Error("Dropoff date must be after pickup date.");
//     }
    
//     // Calculate total
//     const pricePerDay = Number(car?.price || 0);
//     const total = pricePerDay * days;
    
//     // Build the payload matching backend expectations
//     const payload = {
//       userId: userId,
//       carId: Number(carId),
//       pickupDate: formData.pickupDate,
//       dropoffDate: formData.dropoffDate,
//       pickupLocation: formData.pickupLocation,
//       dropoffLocation: formData.dropoffLocation,
//       tripDriverType: formData.tripType || "SELF_DRIVE",
//       days: days,
//       price: pricePerDay,
//       total: total,
//       bookingStatus: "PENDING",
//     };
    
//     // Add driver details for self-drive bookings
//     if (formData.tripType === "SELF_DRIVE") {
//       payload.driverDetails = {
//         firstName: formData.firstName || profileData?.firstName || "",
//         lastName: formData.lastName || profileData?.lastName || "",
//         email: formData.email || profileData?.email || "",
//         phone: formData.phone || profileData?.phone || "",
//         licenseNumber: formData.licenseNumber || "",
//         licenseExpiry: formData.licenseExpiry || "",
//         aadhaarNumber: formData.aadhaarNumber || "",
//       };
//     }
    
//     console.log("📦 Booking Payload:", payload);
//     return payload;
//   };

//   // ==========================================
//   // BUILD WHATSAPP MESSAGE
//   // ==========================================
//   const buildWhatsAppMessage = (bookingPayload, bookingData) => {
//     // Customer information
//     const firstName = formData.firstName || profileData?.firstName || "";
//     const lastName = formData.lastName || profileData?.lastName || "";
//     const email = formData.email || profileData?.email || "";
//     const phone = formData.phone || profileData?.phone || "";
//     const customerName = `${firstName} ${lastName}`.trim();
    
//     // Trip type display
//     const tripTypeDisplay = bookingPayload.tripDriverType === "SELF_DRIVE" 
//       ? "Drive Yourself" 
//       : bookingPayload.tripDriverType === "HIRED_DRIVER"
//         ? "Hired Driver"
//         : bookingPayload.tripDriverType;
    
//     // Mask Aadhaar - NEVER send complete Aadhaar to WhatsApp
//     let maskedAadhaar = "Not Provided";
//     const aadhaarNumber = formData.aadhaarNumber || "";
//     if (aadhaarNumber.length >= 4) {
//       maskedAadhaar = `XXXX XXXX ${aadhaarNumber.slice(-4)}`;
//     }
    
//     // Get booking ID from response
//     const bookingId = bookingData?.bookingId || bookingData?.id || "N/A";
    
//     // Build WhatsApp message
//     return `
// 🚗 *NEW CAR BOOKING REQUEST*

// ━━━━━━━━━━━━━━━━━━━━
// 📋 *BOOKING REFERENCE*
// ━━━━━━━━━━━━━━━━━━━━

// Booking ID: ${bookingId}
// Status: ${bookingPayload.bookingStatus || "PENDING"}

// ━━━━━━━━━━━━━━━━━━━━
// 🚘 *CAR DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// Car: ${car?.name || "N/A"}
// Brand: ${car?.brand || "N/A"}
// Car ID: ${bookingPayload.carId}
// Daily Rate: ${formatRupees(bookingPayload.price)}

// ━━━━━━━━━━━━━━━━━━━━
// 📅 *TRIP DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// Pickup Date: ${bookingPayload.pickupDate}
// Dropoff Date: ${bookingPayload.dropoffDate}
// Pickup Location: ${bookingPayload.pickupLocation}
// Dropoff Location: ${bookingPayload.dropoffLocation}
// Trip Type: ${tripTypeDisplay}
// Rental Days: ${bookingPayload.days}

// ━━━━━━━━━━━━━━━━━━━━
// 👤 *CUSTOMER DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// User ID: ${bookingPayload.userId}
// Name: ${customerName || "N/A"}
// Email: ${email || "N/A"}
// Phone: ${phone || "N/A"}

// ${bookingPayload.tripDriverType === "SELF_DRIVE" ? `
// ━━━━━━━━━━━━━━━━━━━━
// 🪪 *DRIVER DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// License Number: ${formData.licenseNumber || "N/A"}
// License Expiry: ${formData.licenseExpiry || "N/A"}
// Aadhaar: ${maskedAadhaar}
// ` : ""}

// ━━━━━━━━━━━━━━━━━━━━
// 💰 *BOOKING SUMMARY*
// ━━━━━━━━━━━━━━━━━━━━

// Daily Rate: ${formatRupees(bookingPayload.price)}
// Total: ${formatRupees(bookingPayload.total)}
// Booking Status: ${bookingPayload.bookingStatus || "PENDING"}

// ━━━━━━━━━━━━━━━━━━━━

// Please confirm my car booking.

// Thank you.
// `.trim();
//   };

//   // ==========================================
//   // HANDLE CONFIRM BOOKING
//   // ==========================================
//   const handleConfirmBooking = async () => {
//     // Step 1 validation
//     if (!validateStep1()) {
//       setStep(1);
//       return;
//     }

//     // Self-drive validation
//     if (formData.tripType === "SELF_DRIVE" && !validateStep2()) {
//       setStep(2);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const bookingPayload = createBookingPayload();
//       console.log("🚀 Sending booking payload:", bookingPayload);
      
//       const response = await carBooking(bookingPayload);
//       console.log("✅ Booking API response:", response);
      
//       // Handle different response formats
//       if (Array.isArray(response)) {
//         const latestBooking = response[response.length - 1];
//         if (latestBooking) {
//           addBooking(latestBooking);
//         }
        
//         setToast({
//           message: "Booking request sent to admin successfully!",
//           type: "success",
//         });
        
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 2000);
//       } else if (response?.data || response?.bookingId) {
//         const bookingData = response.data || response;
//         addBooking(bookingData);
        
//         setToast({
//           message: "Booking request sent to admin successfully!",
//           type: "success",
//         });
        
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 2000);
//       } else {
//         console.warn("⚠️ Unexpected response format:", response);
//         setToast({
//           message: "Booking request sent, but received unexpected response.",
//           type: "warning",
//         });
//       }
//     } catch (error) {
//       console.error("❌ Booking Error:", error);
      
//       // Check for duplicate booking error
//       const errorMessage = error?.message || "Booking failed!";
      
//       // If the error message contains car already booked keywords
//       if (errorMessage.toLowerCase().includes("already booked") || 
//           errorMessage.toLowerCase().includes("already reserved")) {
//         setToast({
//           message: "This car is already booked for the selected dates. Please choose different dates.",
//           type: "error",
//         });
//       } else {
//         setToast({
//           message: errorMessage,
//           type: "error",
//         });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ==========================================
//   // HANDLE BOOK VIA WHATSAPP
//   // ==========================================
//   // const handleBookViaWhatsApp = async () => {
//   //   // Step 1 validation
//   //   if (!validateStep1()) {
//   //     setStep(1);
//   //     setToast({
//   //       message: "Please complete all booking details first.",
//   //       type: "error",
//   //     });
//   //     return;
//   //   }

//   //   // Self-drive validation
//   //   if (formData.tripType === "SELF_DRIVE" && !validateStep2()) {
//   //     setStep(2);
//   //     setToast({
//   //       message: "Please complete the driver details.",
//   //       type: "error",
//   //     });
//   //     return;
//   //   }

//   //   setIsLoading(true);

//   //   try {
//   //     // Create booking payload
//   //     const bookingPayload = createBookingPayload();
//   //     console.log("📦 WhatsApp Booking Payload:", bookingPayload);

//   //     // STEP 1: Save booking to database
//   //     console.log("💾 Saving booking to database...");
//   //     const response = await carBooking(bookingPayload);
//   //     console.log("✅ Booking saved to database:", response);

//   //     // STEP 2: Extract booking data
//   //     let bookingData = null;
//   //     let bookingId = null;

//   //     if (Array.isArray(response)) {
//   //       bookingData = response[response.length - 1];
//   //       if (bookingData) {
//   //         bookingId = bookingData.bookingId || bookingData.id;
//   //         addBooking(bookingData);
//   //       }
//   //     } else if (response?.data || response?.bookingId) {
//   //       bookingData = response.data || response;
//   //       bookingId = bookingData.bookingId || bookingData.id;
//   //       addBooking(bookingData);
//   //     }

//   //     // STEP 3: If saved successfully, open WhatsApp
//   //     if (bookingId) {
//   //       console.log("📱 Booking ID:", bookingId, " - Opening WhatsApp...");
        
//   //       // Build WhatsApp message with booking details
//   //       const message = buildWhatsAppMessage(bookingPayload, bookingData);
        
//   //       // Business WhatsApp number
//   //       const whatsappNumber = "918378891656";
//   //       const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
//   //       // Open WhatsApp
//   //       window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        
//   //       setToast({
//   //         message: "Booking saved successfully! Redirecting to WhatsApp...",
//   //         type: "success",
//   //       });

//   //       // Navigate to dashboard after delay
//   //       setTimeout(() => {
//   //         navigate("/dashboard");
//   //       }, 3000);
//   //     } else {
//   //       throw new Error("Booking was not saved properly. Please try again.");
//   //     }

//   //   } catch (error) {
//   //     console.error("❌ WhatsApp Booking Error:", error);
      
//   //     // Check for duplicate booking error
//   //     const errorMessage = error?.message || "Unable to process booking.";
      
//   //     if (errorMessage.toLowerCase().includes("already booked") || 
//   //         errorMessage.toLowerCase().includes("already reserved")) {
//   //       setToast({
//   //         message: "This car is already booked for the selected dates. Please choose different dates.",
//   //         type: "error",
//   //       });
//   //     } else {
//   //       setToast({
//   //         message: errorMessage,
//   //         type: "error",
//   //       });
//   //     }
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const handleBookViaWhatsApp = async () => {

//   setIsLoading(true);
//   // STEP 1: Validate trip details
//   if (!validateStep1()) {
//     setStep(1);
//     return;
//   }

//   // STEP 2: Validate documents/customer details for self-drive
//   if (
//     formData.tripType === "SELF_DRIVE" &&
//     !validateStep2()
//   ) {
//     setStep(2);
//     return;
//   }

//   const actualCarId =
//     car?.carId ?? car?.id;

//   const userId =
//     Number(localStorage.getItem("userId"));

//   // Check user
//   if (!userId) {
//     setToast({
//       message: "Please login again.",
//       type: "error"
//     });
//     return;
//   }

//   // Check car
//   if (!actualCarId) {
//     setToast({
//       message: "Car ID is missing. Please select the car again.",
//       type: "error"
//     });
//     return;
//   }

//   // Calculate rental days
//   const pickup =
//     new Date(formData.pickupDate);

//   const dropoff =
//     new Date(formData.dropoffDate);

//   const calculatedDays =
//     Math.ceil(
//       (dropoff.getTime() - pickup.getTime()) /
//       (1000 * 60 * 60 * 24)
//     );

//   if (
//     !Number.isFinite(calculatedDays) ||
//     calculatedDays <= 0
//   ) {
//     setToast({
//       message: "Invalid pickup/drop-off dates.",
//       type: "error"
//     });

//     setStep(1);
//     return;
//   }

//   // Price
//   const pricePerDay =
//     Number(car.price);

//   if (!Number.isFinite(pricePerDay)) {
//     setToast({
//       message: "Invalid car price.",
//       type: "error"
//     });

//     return;
//   }

//   // Calculate amount
//   const subtotal =
//     calculatedDays * pricePerDay;

//   const insurance =
//     formData.tripType === "SELF_DRIVE"
//       ? subtotal * 0.10
//       : subtotal * 0.05;

//   const tax =
//     (subtotal + insurance) * 0.10;

//   const calculatedTotal =
//     subtotal + insurance + tax;

//   // Booking request
//   const booking = {

//     userId: userId,

//     carId: Number(actualCarId),

//     pickupDate:
//       formData.pickupDate,

//     dropoffDate:
//       formData.dropoffDate,

//     pickupLocation:
//       formData.pickupLocation,

//     dropoffLocation:
//       formData.dropoffLocation,

//     tripDriverType:
//       formData.tripType,

//     days:
//       calculatedDays,

//     price:
//       pricePerDay,

//     total:
//       calculatedTotal
//   };

//   console.log(
//     "WhatsApp Booking Request:",
//     booking
//   );

//   try {
//     setIsLoading(true);
//     setToast({
//       message:
//         "Creating WhatsApp booking...",
//       type: "success"
//     });

//     // Call Spring Boot
//     const response =
//       await createWhatsAppBooking(booking);

//     console.log(
//       "WhatsApp Booking Response:",
//       response
//     );

//     /*
//      * IMPORTANT:
//      * Backend should already have:
//      *
//      * 1. Created Booking in DB
//      * 2. bookingStatus = PENDING
//      * 3. bookingSource = WHATSAPP
//      * 4. Generated WhatsApp message
//      */

//     // Open WhatsApp
//     if (response?.whatsappUrl) {

//       window.open(
//         response.whatsappUrl,
//         "_blank",
//         "noopener,noreferrer"
//       );

//     } else {  

//       throw new Error(
//         "WhatsApp URL was not generated by server."
//       );
//     }

//     setToast({
//       message:
//         "Booking created. WhatsApp is ready to send.",
//       type: "success"
//     });

//   } catch (error) {

//     console.error(
//       "WhatsApp Booking Error:",
//       error
//     );

//     setToast({
//       message:
//         error.message ||
//         "WhatsApp booking failed.",
//       type: "error"
//     });
//   }
// };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     console.log("Changed field:", name);
//     console.log("Changed value:", value);

//     let finalValue = value;

//     if (name === "aadhaarNumber") {
//       finalValue = value.replace(/\D/g, "").slice(0, 12);
//     }

//     if (name === "phone") {
//       finalValue = value.replace(/\D/g, "").slice(0, 10);
//     }

//     if (name === "licenseNumber") {
//       finalValue = value.toUpperCase().slice(0, 16);
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: finalValue,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateStep1 = () => {
//     const newErrors = {};

//     if (!formData.pickupDate) {
//       newErrors.pickupDate = "Pickup date is required";
//     } else if (!isTodayOrFutureDate(formData.pickupDate)) {
//       newErrors.pickupDate = "Pickup date cannot be past date";
//     }

//     if (!formData.dropoffDate) {
//       newErrors.dropoffDate = "Dropoff date is required";
//     }

//     if (formData.pickupDate && formData.dropoffDate) {
//       const pickup = new Date(formData.pickupDate);
//       const dropoff = new Date(formData.dropoffDate);

//       if (dropoff <= pickup) {
//         newErrors.dropoffDate = "Dropoff date must be after pickup date";
//       }
//     }

//     if (!formData.pickupLocation) {
//       newErrors.pickupLocation = "Pickup location is required";
//     }

//     if (!formData.dropoffLocation) {
//       newErrors.dropoffLocation = "Dropoff location is required";
//     }

//     if (!formData.tripType) {
//       newErrors.tripType = "Trip type is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateStep2 = () => {
//     const newErrors = {};

//     if (!formData.firstName.trim()) {
//       newErrors.firstName = "First name is required";
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//     }

//     if (!validateEmail(formData.email)) {
//       newErrors.email = "Valid email is required";
//     }

//     if (!validateIndianPhone(formData.phone)) {
//       newErrors.phone =
//         "Enter valid 10 digit Indian mobile number starting with 6, 7, 8, or 9";
//     }

//     if (!formData.licenseNumber.trim()) {
//       newErrors.licenseNumber = "Driving license number is required";
//     } else if (!validateDrivingLicense(formData.licenseNumber)) {
//       newErrors.licenseNumber =
//         "Enter valid license number. Example: MH12 20230012345";
//     }

//     if (!formData.licenseExpiry) {
//       newErrors.licenseExpiry = "License expiry date is required";
//     } else if (!isFutureDate(formData.licenseExpiry)) {
//       newErrors.licenseExpiry = "Driving license must not be expired";
//     }

//     if (!formData.aadhaarNumber) {
//       newErrors.aadhaarNumber = "Aadhaar number is required";
//     } else if (!validateAadhaar(formData.aadhaarNumber)) {
//       newErrors.aadhaarNumber = "Aadhaar number must be exactly 12 digits";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNextStep = async () => {
//     if (step === 1) {
//       if (!validateStep1()) {
//         return;
//       }

//       if (formData.tripType === "HIRED_DRIVER") {
//         setStep(3);
//         return;
//       }

//       const latestDocumentResult = await fetchUserDocuments();
//       const latestStatus =
//         latestDocumentResult?.status || documentStatus;

//       if (latestStatus !== "ACCEPT") {
//         setShowDocumentMessage(true);
//         return;
//       }

//       setStep(2);
//       return;
//     }

//     if (step === 2 && validateStep2()) {
//       setStep(3);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//     fetchUserDocuments();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const email = localStorage.getItem("email");
//       const data = await getUserByEmail(email);

//       setProfileData(data);

//       setFormData((prev) => ({
//         ...prev,
//         firstName: data?.firstName || prev.firstName,
//         lastName: data?.lastName || prev.lastName,
//         email: data?.email || prev.email,
//         phone: data?.phone || prev.phone,
//       }));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!car) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-4">No Car Selected</h1>
//           <button onClick={() => navigate("/cars")} className="btn-primary">
//             Back to Cars
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const days = calculateDays(formData.pickupDate, formData.dropoffDate);
//   const subtotal = calculateTotal(car.price, days);
//   const insurance =
//     formData.insuranceType === "premium" ? subtotal * 0.1 : subtotal * 0.05;
//   const tax = (subtotal + insurance) * 0.1;
//   const total = subtotal + insurance + tax;

//   const locations = ["Mumbai", "Pune", "Nashik", "Nagpur", "Nandurbar"];

//   return (
//     <div className="min-h-screen bg-light py-8">
//       <div className="container-custom">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="flex gap-4 mb-8">
//               {[1, 2, 3].map((s) => (
//                 <div key={s} className="flex items-center gap-2">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
//                       s <= step
//                         ? "bg-secondary text-white"
//                         : "bg-gray-300 text-gray-600"
//                     }`}
//                   >
//                     {s < step ? <FiCheck /> : s}
//                   </div>

//                   {s < 3 && (
//                     <div
//                       className={`w-12 h-1 transition-all ${
//                         s < step ? "bg-secondary" : "bg-gray-300"
//                       }`}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>

//             {step === 1 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white p-8 rounded-xl card-shadow"
//               >
//                 <h2 className="text-2xl font-bold mb-6">Trip Details</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Pickup Date
//                     </label>
//                     <input
//                       type="date"
//                       name="pickupDate"
//                       value={formData.pickupDate}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.pickupDate ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.pickupDate && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.pickupDate}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Dropoff Date
//                     </label>
//                     <input
//                       type="date"
//                       name="dropoffDate"
//                       value={formData.dropoffDate}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.dropoffDate
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                     {errors.dropoffDate && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.dropoffDate}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Pickup Location
//                     </label>
//                     <select
//                       name="pickupLocation"
//                       value={formData.pickupLocation}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.pickupLocation
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       <option value="">Select Location</option>
//                       {locations.map((loc) => (
//                         <option key={loc} value={loc}>
//                           {loc}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.pickupLocation && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.pickupLocation}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Dropoff Location
//                     </label>
//                     <select
//                       name="dropoffLocation"
//                       value={formData.dropoffLocation}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.dropoffLocation
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       <option value="">Select Location</option>
//                       {locations.map((loc) => (
//                         <option key={loc} value={loc}>
//                           {loc}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.dropoffLocation && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.dropoffLocation}
//                       </p>
//                     )}
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold mb-2">
//                       Trip Type
//                     </label>

//                     <select
//                       name="tripType"
//                       value={formData.tripType}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.tripType ? "border-red-500" : "border-gray-300"
//                       }`}
//                     >
//                       <option value="">Select Trip Type</option>
//                       <option value="SELF_DRIVE">Drive Yourself</option>
//                       <option value="HIRED_DRIVER">Hired Driver</option>
//                     </select>

//                     {errors.tripType && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.tripType}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleNextStep}
//                   disabled={documentLoading}
//                   className="btn-primary w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {documentLoading ? (
//                     <>
//                       <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                       Checking Documents...
//                     </>
//                   ) : (
//                     <>
//                       Continue <FiArrowRight />
//                     </>
//                   )}
//                 </button>
//               </motion.div>
//             )}

//             {step === 2 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white p-8 rounded-xl card-shadow"
//               >
//                 <h2 className="text-2xl font-bold mb-6">Driver Information</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.firstName ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.firstName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.firstName}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.lastName ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.lastName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.lastName}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.email ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       placeholder="10 digit mobile number"
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.phone ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.phone && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.phone}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Driving License Number
//                     </label>
//                     <input
//                       type="text"
//                       name="licenseNumber"
//                       value={formData.licenseNumber}
//                       onChange={handleInputChange}
//                       placeholder="Example: MH12 20230012345"
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.licenseNumber
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                     {errors.licenseNumber && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.licenseNumber}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       License Expiry
//                     </label>
//                     <input
//                       type="date"
//                       name="licenseExpiry"
//                       value={formData.licenseExpiry}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.licenseExpiry
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                     {errors.licenseExpiry && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.licenseExpiry}
//                       </p>
//                     )}
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold mb-2">
//                       Aadhaar Number
//                     </label>
//                     <input
//                       type="text"
//                       name="aadhaarNumber"
//                       value={formData.aadhaarNumber}
//                       onChange={handleInputChange}
//                       placeholder="12 digit Aadhaar number"
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.aadhaarNumber
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                     {errors.aadhaarNumber && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.aadhaarNumber}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => setStep(1)}
//                     className="btn-outline flex-1"
//                   >
//                     Back
//                   </button>

//                   <button
//                     onClick={handleNextStep}
//                     className="btn-primary flex-1 flex items-center justify-center gap-2"
//                   >
//                     Continue <FiArrowRight />
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {step === 3 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white p-8 rounded-xl card-shadow"
//               >
//                 <h2 className="text-2xl font-bold mb-6">Review Your Booking</h2>

//                 <div className="space-y-6">
//                   <div className="border-b pb-6">
//                     <h3 className="font-bold mb-4">Car Details</h3>

//                     <div className="flex gap-4">
//                       <img
//                         src={getCarImageUrl(car.mainImage)}
//                         alt={car.name}
//                         className="w-20 h-18 rounded-lg object-contain bg-gray-100 border"
//                         onError={(e) => {
//                           e.target.src = "/placeholder-car.jpg";
//                         }}
//                       />

//                       <div>
//                         <p className="font-bold text-lg">{car.name}</p>
//                         <p className="text-gray-600">{car.brand}</p>
//                         <p className="text-secondary font-bold">
//                           {formatRupees(car.price)}/day
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-b pb-6">
//                     <h3 className="font-bold mb-4">Trip Details</h3>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-gray-600 text-sm">Pickup</p>
//                         <p className="font-semibold">{formData.pickupDate}</p>
//                         <p className="text-gray-600">
//                           {formData.pickupLocation}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-gray-600 text-sm">Dropoff</p>
//                         <p className="font-semibold">{formData.dropoffDate}</p>
//                         <p className="text-gray-600">
//                           {formData.dropoffLocation}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-b pb-6">
//                     <h3 className="font-bold mb-4">Driver Details</h3>

//                     {formData.tripType === "HIRED_DRIVER" ? (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-gray-500 text-sm">Name</p>
//                           <p className="font-semibold">
//                             {profileData?.firstName} {profileData?.lastName}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">Email</p>
//                           <p className="font-semibold">{profileData?.email}</p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">Phone</p>
//                           <p className="font-semibold">{profileData?.phone}</p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-gray-500 text-sm">Name</p>
//                           <p className="font-semibold">
//                             {formData.firstName} {formData.lastName}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">Email</p>
//                           <p className="font-semibold">{formData.email}</p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">Phone</p>
//                           <p className="font-semibold">{formData.phone}</p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             License Number
//                           </p>
//                           <p className="font-semibold">
//                             {formData.licenseNumber}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             License Expiry
//                           </p>
//                           <p className="font-semibold">
//                             {formData.licenseExpiry}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             Aadhaar Number
//                           </p>
//                           <p className="font-semibold">
//                             XXXX XXXX {formData.aadhaarNumber.slice(-4)}
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-8 border-t border-gray-200 pt-6">
//                   <div className="flex flex-col gap-3 sm:flex-row">
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setStep(
//                           formData.tripType === "HIRED_DRIVER" ? 1 : 2
//                         )
//                       }
//                       className="flex-1 min-h-[50px] rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400"
//                     >
//                       Back
//                     </button>

//                     <button
//                       type="button"
//                       onClick={handleBookViaWhatsApp}
//                       disabled={isLoading}
//                       className="flex-1 min-h-[50px] rounded-lg bg-[#25D366] px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1ebe5d] hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isLoading ? (
//                         <>
//                           <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <FiMessageCircle className="text-xl" />
//                           <span>Book via WhatsApp</span>
//                         </>
//                       )}
//                     </button>

//                     <button
//                       type="button"
//                       onClick={handleConfirmBooking}
//                       disabled={isLoading}
//                       className="flex-1 min-h-[50px] rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isLoading ? (
//                         <>
//                           <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                           Processing...
//                         </>
//                       ) : (
//                         <>
//                           <FiCheck className="text-lg" />
//                           <span>Confirm Booking</span>
//                         </>
//                       )}
//                     </button>
//                   </div>

//                   <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
//                     <FiMessageCircle className="mt-0.5 shrink-0 text-lg text-[#25D366]" />
//                     <div>
//                       <p className="font-semibold text-green-800">
//                         Book quickly through WhatsApp
//                       </p>
//                       <p className="mt-1 text-sm text-green-700">
//                         Your booking will be saved in the system first, then
//                         you'll be redirected to WhatsApp with all details.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white p-8 rounded-xl card-shadow sticky top-24">
//               <h3 className="text-xl font-bold mb-6">Booking Summary</h3>

//               <div className="mb-6 pb-6 border-b">
//                 <img
//                   src={getCarImageUrl(car.mainImage)}
//                   alt={car.name}
//                   className="w-14 h-12 rounded-lg object-contain bg-gray-100 border"
//                   onError={(e) => {
//                     e.target.src = "/placeholder-car.jpg";
//                   }}
//                 />

//                 <p className="font-bold text-lg">{car.name}</p>
//                 <p className="text-gray-600">{car.brand}</p>

//                 <div className="flex justify-between mt-3">
//                   <span className="text-gray-600">Trip Type</span>
//                   <span className="font-semibold">
//                     {formData.tripType === "SELF_DRIVE"
//                       ? "Drive Yourself"
//                       : formData.tripType === "HIRED_DRIVER"
//                         ? "Hired Driver"
//                         : "Not Selected"}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-3 mb-6 pb-6 border-b">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Rental Days</span>
//                   <span className="font-semibold">{days}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Daily Rate</span>
//                   <span className="font-semibold">
//                     {formatRupees(car.price)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-semibold">
//                     {formatRupees(subtotal)}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-3 mb-6 pb-6 border-b">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Insurance</span>
//                   <span className="font-semibold">
//                     {formatRupees(insurance)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax 10%</span>
//                   <span className="font-semibold">{formatRupees(tax)}</span>
//                 </div>
//               </div>

//               <div className="flex justify-between mb-6">
//                 <span className="font-bold text-lg">Total</span>
//                 <span className="text-2xl font-bold text-secondary">
//                   {formatRupees(total)}
//                 </span>
//               </div>

//               <div className="bg-light p-4 rounded-lg text-sm text-gray-600">
//                 <p>✓ Full insurance included</p>
//                 <p>✓ Free cancellation up to 24 hours</p>
//                 <p>✓ 24/7 roadside assistance</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showDocumentMessage && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
//           onClick={() => setShowDocumentMessage(false)}
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.94, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={(event) => event.stopPropagation()}
//             className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
//           >
//             <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
//                   <FiAlertCircle className="text-2xl text-red-600" />
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
//                     Document verification required
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Self-drive booking is available after document approval.
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setShowDocumentMessage(false)}
//                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
//                 aria-label="Close document verification message"
//               >
//                 <FiX className="text-xl" />
//               </button>
//             </div>

//             <div className="px-5 py-6 sm:px-6">
//               <div
//                 className={`rounded-xl border p-4 ${
//                   documentStatus === "REJECT"
//                     ? "border-red-200 bg-red-50"
//                     : documentStatus === "PENDING"
//                       ? "border-yellow-200 bg-yellow-50"
//                       : "border-blue-200 bg-blue-50"
//                 }`}
//               >
//                 <div className="flex items-start gap-3">
//                   <FiFileText
//                     className={`mt-0.5 shrink-0 text-xl ${
//                       documentStatus === "REJECT"
//                         ? "text-red-600"
//                         : documentStatus === "PENDING"
//                           ? "text-yellow-600"
//                           : "text-blue-600"
//                     }`}
//                   />

//                   <div>
//                     <p className="font-semibold text-gray-900">
//                       {documentStatus === "REJECT"
//                         ? "Your documents were rejected"
//                         : documentStatus === "PENDING"
//                           ? "Your documents are under review"
//                           : "Documents have not been uploaded"}
//                     </p>

//                     <p className="mt-1 text-sm leading-6 text-gray-600">
//                       {documentStatus === "REJECT"
//                         ? "Please review the rejection reason, upload corrected documents from your profile, and wait for administrator approval."
//                         : documentStatus === "PENDING"
//                           ? "Your documents have been submitted successfully. Please wait until the administrator approves them."
//                           : "Please upload your Driving Licence and Aadhaar Card from your profile before continuing with a self-drive booking."}
//                     </p>

//                     {documentStatus === "REJECT" &&
//                       documentData?.reason && (
//                         <div className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2">
//                           <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
//                             Rejection reason
//                           </p>
//                           <p className="mt-1 text-sm text-gray-700">
//                             {documentData.reason}
//                           </p>
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               </div>

//               <p className="mt-4 text-sm leading-6 text-gray-600">
//                 After your document status becomes{" "}
//                 <span className="font-bold text-green-700">ACCEPTED</span>,
//                 return to this page and continue your booking.
//               </p>
//             </div>

//             <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
//               <button
//                 type="button"
//                 onClick={() => setShowDocumentMessage(false)}
//                 className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
//               >
//                 Stay on Booking
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowDocumentMessage(false);
//                   navigate("/dashboard", {
//                     state: {
//                       activeTab: "documents",
//                     },
//                   });
//                 }}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
//               >
//                 <FiFileText />
//                 Go to Profile Documents
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {toast && (
//         <div className="fixed bottom-8 right-8 z-50">
//           <Toast
//             message={toast.message}
//             type={toast.type}
//             onClose={() => setToast(null)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FiCheck,
//   FiArrowRight,
//   FiAlertCircle,
//   FiFileText,
//   FiX,
//   FiMessageCircle,
// } from "react-icons/fi";

// import { useAuth } from "../context/AuthContext";
// import { useBooking } from "../context/BookingContext";
// import {
//   calculateDays,
//   calculateTotal,
//   validateEmail,
// } from "../utils/helpers";
// import Toast from "../components/Toast";

// import {
//   getUserByEmail,
//   carBooking,
//   getCarImageUrl,
//   getUserDocuments,
//   createWhatsAppBooking,
// } from "../services/carService";

// const Booking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { user } = useAuth();
//   const { addBooking } = useBooking();

//   const car = location.state?.car;

//   // ============================================================
//   // STATE
//   // ============================================================

//   const [toast, setToast] = useState(null);

//   const [step, setStep] = useState(1);

//   const [profileData, setProfileData] = useState(null);

//   const [errors, setErrors] = useState({});

//   const [isLoading, setIsLoading] = useState(false);

//   const [documentData, setDocumentData] = useState(null);

//   const [documentStatus, setDocumentStatus] =
//     useState("NOT_UPLOADED");

//   const [documentLoading, setDocumentLoading] =
//     useState(true);

//   const [showDocumentMessage, setShowDocumentMessage] =
//     useState(false);

//   const [formData, setFormData] = useState({
//     pickupDate: "",
//     dropoffDate: "",
//     pickupLocation: "",
//     dropoffLocation: "",
//     tripType: "",

//     firstName: user?.firstName || "",
//     lastName: user?.lastName || "",
//     email: user?.email || "",
//     phone: user?.phone || "",

//     licenseNumber: "",
//     licenseExpiry: "",
//     aadhaarNumber: "",

//     insuranceType: "basic",

//     additionalServices: [],
//   });

//   // ============================================================
//   // CONSTANTS
//   // ============================================================

//   const locations = [
//     "Mumbai",
//     "Pune",
//     "Nashik",
//     "Nagpur",
//     "Nandurbar",
//   ];

//   // ============================================================
//   // FORMAT CURRENCY
//   // ============================================================

//   const formatRupees = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(Number(amount) || 0);
//   };

//   // ============================================================
//   // DOCUMENT STATUS
//   // ============================================================

//   const normalizeDocumentStatus = (value) => {
//     const status = String(value || "")
//       .trim()
//       .toUpperCase();

//     if (
//       status === "ACCEPT" ||
//       status === "ACCEPTED" ||
//       status === "APPROVED"
//     ) {
//       return "ACCEPT";
//     }

//     if (
//       status === "REJECT" ||
//       status === "REJECTED"
//     ) {
//       return "REJECT";
//     }

//     if (
//       status === "PENDING" ||
//       status === "UNDER_REVIEW"
//     ) {
//       return "PENDING";
//     }

//     return "NOT_UPLOADED";
//   };

//   // ============================================================
//   // FETCH USER DOCUMENTS
//   // ============================================================

//   const fetchUserDocuments = async () => {
//     try {
//       setDocumentLoading(true);

//       const response = await getUserDocuments();

//       let latestDocument = response?.data ?? response;

//       // If API returns an array, take latest document
//       if (Array.isArray(latestDocument)) {
//         latestDocument =
//           latestDocument.length > 0
//             ? latestDocument[latestDocument.length - 1]
//             : null;
//       }

//       if (!latestDocument) {
//         setDocumentData(null);
//         setDocumentStatus("NOT_UPLOADED");

//         setFormData((previous) => ({
//           ...previous,
//           licenseNumber: "",
//           licenseExpiry: "",
//           aadhaarNumber: "",
//         }));

//         return null;
//       }

//       console.log(
//         "User Documents:",
//         latestDocument
//       );

//       const status = normalizeDocumentStatus(
//         latestDocument.status ??
//           latestDocument.documentStatus ??
//           latestDocument.verificationStatus
//       );

//       const rawLicenseExpiry =
//         latestDocument.licenseExpiry ??
//         latestDocument.drivingLicenseExpiry ??
//         latestDocument.drivingLicenceExpiry ??
//         "";

//       const normalizedLicenseExpiry =
//         rawLicenseExpiry
//           ? String(rawLicenseExpiry).split("T")[0]
//           : "";

//       const licenseNumber =
//         latestDocument.drivingLicenseNo ??
//         latestDocument.drivingLicenseNumber ??
//         latestDocument.drivingLicenceNumber ??
//         latestDocument.licenseNumber ??
//         "";

//       const aadhaarNumber =
//         latestDocument.aadharNo ??
//         latestDocument.aadhaarNumber ??
//         latestDocument.aadhaarCardNumber ??
//         latestDocument.aadhharNumber ??
//         "";

//       setDocumentData(latestDocument);
//       setDocumentStatus(status);

//       setFormData((previous) => ({
//         ...previous,

//         licenseNumber,
//         licenseExpiry: normalizedLicenseExpiry,
//         aadhaarNumber,
//       }));

//       return {
//         data: latestDocument,
//         status,
//       };
//     } catch (error) {
//       console.error(
//         "Document Fetch Error:",
//         error?.response?.data ||
//           error?.message ||
//           error
//       );

//       setDocumentData(null);
//       setDocumentStatus("NOT_UPLOADED");

//       return null;
//     } finally {
//       setDocumentLoading(false);
//     }
//   };

//   // ============================================================
//   // FETCH USER PROFILE
//   // ============================================================

//   const fetchUserProfile = async () => {
//     try {
//       const email =
//         localStorage.getItem("email") ||
//         user?.email;

//       if (!email) {
//         return;
//       }

//       const data = await getUserByEmail(email);

//       console.log("User Profile:", data);

//       setProfileData(data);

//       setFormData((previous) => ({
//         ...previous,

//         firstName:
//           data?.firstName ||
//           previous.firstName,

//         lastName:
//           data?.lastName ||
//           previous.lastName,

//         email:
//           data?.email ||
//           previous.email,

//         phone:
//           data?.phone ||
//           previous.phone,
//       }));
//     } catch (error) {
//       console.error(
//         "Profile Fetch Error:",
//         error?.response?.data ||
//           error?.message ||
//           error
//       );
//     }
//   };

//   // ============================================================
//   // VALIDATION HELPERS
//   // ============================================================

//   const validateIndianPhone = (phone) => {
//     return /^[6-9]\d{9}$/.test(
//       String(phone || "")
//     );
//   };

//   const validateAadhaar = (aadhaar) => {
//     return /^\d{12}$/.test(
//       String(aadhaar || "")
//     );
//   };

//   const validateDrivingLicense = (license) => {
//     return /^[A-Z]{2}\d{2}\s?\d{11}$/.test(
//       String(license || "").toUpperCase()
//     );
//   };

//   const isTodayOrFutureDate = (date) => {
//     if (!date) {
//       return false;
//     }

//     const selectedDate = new Date(date);

//     const today = new Date();

//     today.setHours(0, 0, 0, 0);

//     return selectedDate >= today;
//   };

//   // License should not be expired.
//   // Expiry today is considered valid until the end of today.
//   const isLicenseValid = (date) => {
//     if (!date) {
//       return false;
//     }

//     const expiryDate = new Date(date);

//     expiryDate.setHours(23, 59, 59, 999);

//     const today = new Date();

//     today.setHours(0, 0, 0, 0);

//     return expiryDate >= today;
//   };

//   // ============================================================
//   // HANDLE INPUT CHANGE
//   // ============================================================

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     let finalValue = value;

//     if (name === "aadhaarNumber") {
//       finalValue = value
//         .replace(/\D/g, "")
//         .slice(0, 12);
//     }

//     if (name === "phone") {
//       finalValue = value
//         .replace(/\D/g, "")
//         .slice(0, 10);
//     }

//     if (name === "licenseNumber") {
//       finalValue = value
//         .toUpperCase()
//         .slice(0, 16);
//     }

//     setFormData((previous) => ({
//       ...previous,
//       [name]: finalValue,
//     }));

//     if (errors[name]) {
//       setErrors((previous) => ({
//         ...previous,
//         [name]: "",
//       }));
//     }
//   };

//   // ============================================================
//   // VALIDATE STEP 1
//   // ============================================================

//   const validateStep1 = () => {
//     const newErrors = {};

//     if (!formData.pickupDate) {
//       newErrors.pickupDate =
//         "Pickup date is required";
//     } else if (
//       !isTodayOrFutureDate(
//         formData.pickupDate
//       )
//     ) {
//       newErrors.pickupDate =
//         "Pickup date cannot be in the past";
//     }

//     if (!formData.dropoffDate) {
//       newErrors.dropoffDate =
//         "Dropoff date is required";
//     }

//     if (
//       formData.pickupDate &&
//       formData.dropoffDate
//     ) {
//       const pickup = new Date(
//         formData.pickupDate
//       );

//       const dropoff = new Date(
//         formData.dropoffDate
//       );

//       if (dropoff <= pickup) {
//         newErrors.dropoffDate =
//           "Dropoff date must be after pickup date";
//       }
//     }

//     if (!formData.pickupLocation) {
//       newErrors.pickupLocation =
//         "Pickup location is required";
//     }

//     if (!formData.dropoffLocation) {
//       newErrors.dropoffLocation =
//         "Dropoff location is required";
//     }

//     if (!formData.tripType) {
//       newErrors.tripType =
//         "Trip type is required";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // ============================================================
//   // VALIDATE STEP 2
//   // ============================================================

//   const validateStep2 = () => {
//     const newErrors = {};

//     if (!formData.firstName.trim()) {
//       newErrors.firstName =
//         "First name is required";
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName =
//         "Last name is required";
//     }

//     if (!validateEmail(formData.email)) {
//       newErrors.email =
//         "Valid email is required";
//     }

//     if (!validateIndianPhone(formData.phone)) {
//       newErrors.phone =
//         "Enter valid 10 digit Indian mobile number";
//     }

//     if (!formData.licenseNumber.trim()) {
//       newErrors.licenseNumber =
//         "Driving license number is required";
//     } else if (
//       !validateDrivingLicense(
//         formData.licenseNumber
//       )
//     ) {
//       newErrors.licenseNumber =
//         "Enter valid license number. Example: MH12 20230012345";
//     }

//     if (!formData.licenseExpiry) {
//       newErrors.licenseExpiry =
//         "License expiry date is required";
//     } else if (
//       !isLicenseValid(
//         formData.licenseExpiry
//       )
//     ) {
//       newErrors.licenseExpiry =
//         "Driving license is expired";
//     }

//     if (!formData.aadhaarNumber) {
//       newErrors.aadhaarNumber =
//         "Aadhaar number is required";
//     } else if (
//       !validateAadhaar(
//         formData.aadhaarNumber
//       )
//     ) {
//       newErrors.aadhaarNumber =
//         "Aadhaar number must be exactly 12 digits";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // ============================================================
//   // CALCULATE BOOKING
//   // SINGLE SOURCE OF TRUTH
//   // ============================================================

//   const calculateBooking = () => {
//     if (!car) {
//       throw new Error(
//         "Car information is missing."
//       );
//     }

//     const pickup = new Date(
//       formData.pickupDate
//     );

//     const dropoff = new Date(
//       formData.dropoffDate
//     );

//     const days = Math.ceil(
//       (dropoff.getTime() -
//         pickup.getTime()) /
//         (1000 * 60 * 60 * 24)
//     );

//     if (!Number.isFinite(days) || days <= 0) {
//       throw new Error(
//         "Invalid rental dates."
//       );
//     }

//     const pricePerDay = Number(
//       car?.price || 0
//     );

//     if (
//       !Number.isFinite(pricePerDay) ||
//       pricePerDay <= 0
//     ) {
//       throw new Error(
//         "Invalid car price."
//       );
//     }

//     const subtotal =
//       days * pricePerDay;

//     // Basic insurance = 5%
//     // Premium insurance = 10%
//     const insuranceRate =
//       formData.insuranceType === "premium"
//         ? 0.10
//         : 0.05;

//     const insurance =
//       subtotal * insuranceRate;

//     // Tax = 10%
//     const tax =
//       (subtotal + insurance) * 0.10;

//     const total =
//       subtotal +
//       insurance +
//       tax;

//     return {
//       days,
//       pricePerDay,
//       subtotal,
//       insurance,
//       tax,
//       total,
//     };
//   };

//   // ============================================================
//   // GET USER ID
//   // ============================================================

//   const getUserId = () => {
//     const userId = Number(
//       localStorage.getItem("userId")
//     );

//     if (!userId) {
//       throw new Error(
//         "User ID is missing. Please login again."
//       );
//     }

//     return userId;
//   };

//   // ============================================================
//   // GET CAR ID
//   // ============================================================

//   const getCarId = () => {
//     const carId =
//       car?.carId ??
//       car?.id ??
//       car?.vehicleId;

//     if (!carId) {
//       throw new Error(
//         "Car ID is missing. Please select the car again."
//       );
//     }

//     return Number(carId);
//   };

//   // ============================================================
//   // CREATE BOOKING PAYLOAD
//   // ============================================================

//   const createBookingPayload = () => {
//     const userId = getUserId();

//     const carId = getCarId();

//     const calculation =
//       calculateBooking();

//     const payload = {
//       userId,

//       carId,

//       pickupDate:
//         formData.pickupDate,

//       dropoffDate:
//         formData.dropoffDate,

//       pickupLocation:
//         formData.pickupLocation,

//       dropoffLocation:
//         formData.dropoffLocation,

//       tripDriverType:
//         formData.tripType,

//       days:
//         calculation.days,

//       price:
//         calculation.pricePerDay,

//       total:
//         calculation.total,

//       bookingStatus:
//         "PENDING",
//     };

//     // Self-drive driver details
//     if (
//       formData.tripType ===
//       "SELF_DRIVE"
//     ) {
//       payload.driverDetails = {
//         firstName:
//           formData.firstName ||
//           profileData?.firstName ||
//           "",

//         lastName:
//           formData.lastName ||
//           profileData?.lastName ||
//           "",

//         email:
//           formData.email ||
//           profileData?.email ||
//           "",

//         phone:
//           formData.phone ||
//           profileData?.phone ||
//           "",

//         licenseNumber:
//           formData.licenseNumber || "",

//         licenseExpiry:
//           formData.licenseExpiry || "",

//         aadhaarNumber:
//           formData.aadhaarNumber || "",
//       };
//     }

//     console.log(
//       "Booking Payload:",
//       payload
//     );

//     return payload;
//   };

//   // ============================================================
//   // EXTRACT BOOKING RESPONSE
//   // ============================================================

//   const extractBookingData = (response) => {
//     if (!response) {
//       return null;
//     }

//     // Array response
//     if (Array.isArray(response)) {
//       return (
//         response[response.length - 1] ||
//         null
//       );
//     }

//     // Axios response
//     if (
//       response?.data &&
//       typeof response.data === "object"
//     ) {
//       return response.data;
//     }

//     return response;
//   };

//   // ============================================================
//   // HANDLE NEXT STEP
//   // ============================================================

//   const handleNextStep = async () => {
//     // STEP 1
//     if (step === 1) {
//       if (!validateStep1()) {
//         return;
//       }

//       // Hired driver does not require
//       // user's driving documents
//       if (
//         formData.tripType ===
//         "HIRED_DRIVER"
//       ) {
//         setStep(3);
//         return;
//       }

//       // SELF DRIVE
//       const latestDocumentResult =
//         await fetchUserDocuments();

//       const latestStatus =
//         latestDocumentResult?.status ||
//         documentStatus;

//       if (latestStatus !== "ACCEPT") {
//         setShowDocumentMessage(true);
//         return;
//       }

//       setStep(2);
//       return;
//     }

//     // STEP 2
//     if (step === 2) {
//       if (!validateStep2()) {
//         return;
//       }

//       setStep(3);
//     }
//   };

//   // ============================================================
//   // HANDLE NORMAL BOOKING
//   // ============================================================

//   const handleConfirmBooking = async () => {
//     if (!validateStep1()) {
//       setStep(1);
//       return;
//     }

//     if (
//       formData.tripType ===
//         "SELF_DRIVE" &&
//       !validateStep2()
//     ) {
//       setStep(2);
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const bookingPayload =
//         createBookingPayload();

//       console.log(
//         "Sending normal booking:",
//         bookingPayload
//       );

//       const response =
//         await carBooking(
//           bookingPayload
//         );

//       console.log(
//         "Booking API Response:",
//         response
//       );

//       const bookingData =
//         extractBookingData(response);

//       if (!bookingData) {
//         throw new Error(
//           "Booking was not saved properly."
//         );
//       }

//       addBooking(bookingData);

//       setToast({
//         message:
//           "Booking request sent to admin successfully!",
//         type: "success",
//       });

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2000);
//     } catch (error) {
//       console.error(
//         "Booking Error:",
//         error
//       );

//       const errorMessage =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         error?.message ||
//         "Booking failed!";

//       const lowerMessage =
//         errorMessage.toLowerCase();

//       if (
//         lowerMessage.includes(
//           "already booked"
//         ) ||
//         lowerMessage.includes(
//           "already reserved"
//         )
//       ) {
//         setToast({
//           message:
//             "This car is already booked for the selected dates. Please choose different dates.",
//           type: "error",
//         });
//       } else {
//         setToast({
//           message: errorMessage,
//           type: "error",
//         });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ============================================================
//   // BUILD WHATSAPP MESSAGE
//   // ============================================================

//   const buildWhatsAppMessage = (
//     bookingPayload,
//     bookingData
//   ) => {
//     const firstName =
//       formData.firstName ||
//       profileData?.firstName ||
//       "";

//     const lastName =
//       formData.lastName ||
//       profileData?.lastName ||
//       "";

//     const email =
//       formData.email ||
//       profileData?.email ||
//       "";

//     const phone =
//       formData.phone ||
//       profileData?.phone ||
//       "";

//     const customerName =
//       `${firstName} ${lastName}`.trim();

//     const tripTypeDisplay =
//       bookingPayload.tripDriverType ===
//       "SELF_DRIVE"
//         ? "Drive Yourself"
//         : bookingPayload.tripDriverType ===
//           "HIRED_DRIVER"
//         ? "Hired Driver"
//         : bookingPayload.tripDriverType;

//     // Mask Aadhaar
//     let maskedAadhaar =
//       "Not Provided";

//     const aadhaar =
//       formData.aadhaarNumber || "";

//     if (aadhaar.length >= 4) {
//       maskedAadhaar =
//         `XXXX XXXX ${aadhaar.slice(-4)}`;
//     }

//     const bookingId =
//       bookingData?.bookingId ||
//       bookingData?.id ||
//       "N/A";

//     return `
// 🚗 *NEW CAR BOOKING REQUEST*

// ━━━━━━━━━━━━━━━━━━━━
// 📋 *BOOKING REFERENCE*
// ━━━━━━━━━━━━━━━━━━━━

// Booking ID: ${bookingId}
// Status: ${
//       bookingPayload.bookingStatus ||
//       "PENDING"
//     }

// ━━━━━━━━━━━━━━━━━━━━
// 🚘 *CAR DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// Car: ${car?.name || "N/A"}
// Brand: ${car?.brand || "N/A"}
// Car ID: ${bookingPayload.carId}
// Daily Rate: ${formatRupees(
//       bookingPayload.price
//     )}

// ━━━━━━━━━━━━━━━━━━━━
// 📅 *TRIP DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// Pickup Date: ${
//       bookingPayload.pickupDate
//     }
// Dropoff Date: ${
//       bookingPayload.dropoffDate
//     }
// Pickup Location: ${
//       bookingPayload.pickupLocation
//     }
// Dropoff Location: ${
//       bookingPayload.dropoffLocation
//     }
// Trip Type: ${tripTypeDisplay}
// Rental Days: ${
//       bookingPayload.days
//     }

// ━━━━━━━━━━━━━━━━━━━━
// 👤 *CUSTOMER DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// User ID: ${
//       bookingPayload.userId
//     }
// Name: ${customerName || "N/A"}
// Email: ${email || "N/A"}
// Phone: ${phone || "N/A"}

// ${
//   bookingPayload.tripDriverType ===
//   "SELF_DRIVE"
//     ? `
// ━━━━━━━━━━━━━━━━━━━━
// 🪪 *DRIVER DETAILS*
// ━━━━━━━━━━━━━━━━━━━━

// License Number: ${
//         formData.licenseNumber ||
//         "N/A"
//       }
// License Expiry: ${
//         formData.licenseExpiry ||
//         "N/A"
//       }
// Aadhaar: ${maskedAadhaar}
// `
//     : ""
// }

// ━━━━━━━━━━━━━━━━━━━━
// 💰 *BOOKING SUMMARY*
// ━━━━━━━━━━━━━━━━━━━━

// Daily Rate: ${formatRupees(
//       bookingPayload.price
//     )}
// Total: ${formatRupees(
//       bookingPayload.total
//     )}
// Booking Status: ${
//       bookingPayload.bookingStatus ||
//       "PENDING"
//     }

// ━━━━━━━━━━━━━━━━━━━━

// Please confirm my car booking.

// Thank you.
// `.trim();
//   };

//   // ============================================================
//   // HANDLE WHATSAPP BOOKING
//   // ============================================================

//   const handleBookViaWhatsApp = async () => {
//     // Validate STEP 1
//     if (!validateStep1()) {
//       setStep(1);

//       setToast({
//         message:
//           "Please complete all booking details first.",
//         type: "error",
//       });

//       return;
//     }

//     // Validate STEP 2
//     if (
//       formData.tripType ===
//         "SELF_DRIVE" &&
//       !validateStep2()
//     ) {
//       setStep(2);

//       setToast({
//         message:
//           "Please complete the driver details.",
//         type: "error",
//       });

//       return;
//     }

//     try {
//       setIsLoading(true);

//       const bookingPayload =
//         createBookingPayload();

//       console.log(
//         "WhatsApp Booking Payload:",
//         bookingPayload
//       );

//       setToast({
//         message:
//           "Creating WhatsApp booking...",
//         type: "success",
//       });

//       // ========================================================
//       // CALL BACKEND
//       // ========================================================

//       const response =
//         await createWhatsAppBooking(
//           bookingPayload
//         );

//       console.log(
//         "WhatsApp Booking Response:",
//         response
//       );

//       // ========================================================
//       // EXTRACT RESPONSE
//       // ========================================================

//       const responseData =
//         response?.data ||
//         response;

//       const bookingData =
//         responseData?.booking ||
//         responseData?.bookingData ||
//         responseData;

//       const whatsappUrl =
//         responseData?.whatsappUrl;

//       // ========================================================
//       // ADD BOOKING TO CONTEXT
//       // ========================================================

//       if (bookingData) {
//         addBooking(bookingData);
//       }

//       // ========================================================
//       // OPEN WHATSAPP
//       // ========================================================

//       if (whatsappUrl) {
//         window.open(
//           whatsappUrl,
//           "_blank",
//           "noopener,noreferrer"
//         );
//       } else {
//         // Fallback:
//         // Build WhatsApp message on frontend
//         const message =
//           buildWhatsAppMessage(
//             bookingPayload,
//             bookingData
//           );

//         const whatsappNumber =
//           "918378891656";

//         const fallbackUrl =
//           `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//             message
//           )}`;

//         window.open(
//           fallbackUrl,
//           "_blank",
//           "noopener,noreferrer"
//         );
//       }

//       setToast({
//         message:
//           "Booking created successfully. WhatsApp is ready to send.",
//         type: "success",
//       });

//       // Navigate after opening WhatsApp
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2500);
//     } catch (error) {
//       console.error(
//         "WhatsApp Booking Error:",
//         error
//       );

//       const errorMessage =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         error?.message ||
//         "WhatsApp booking failed.";

//       const lowerMessage =
//         errorMessage.toLowerCase();

//       if (
//         lowerMessage.includes(
//           "already booked"
//         ) ||
//         lowerMessage.includes(
//           "already reserved"
//         )
//       ) {
//         setToast({
//           message:
//             "This car is already booked for the selected dates. Please choose different dates.",
//           type: "error",
//         });
//       } else {
//         setToast({
//           message: errorMessage,
//           type: "error",
//         });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ============================================================
//   // FETCH DATA ON PAGE LOAD
//   // ============================================================

//   useEffect(() => {
//     fetchUserProfile();
//     fetchUserDocuments();
//   }, []);

//   // ============================================================
//   // NO CAR
//   // ============================================================

//   if (!car) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="bg-white p-8 rounded-xl shadow-md text-center">
//           <h2 className="text-2xl font-bold mb-4">
//             No Car Selected
//           </h2>

//           <button
//             onClick={() =>
//               navigate("/cars")
//             }
//             className="btn-primary px-6 py-3 rounded-lg"
//           >
//             Back to Cars
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // BOOKING SUMMARY
//   // ============================================================

//   let calculation = {
//     days: 0,
//     pricePerDay: Number(car?.price || 0),
//     subtotal: 0,
//     insurance: 0,
//     tax: 0,
//     total: 0,
//   };

//   try {
//     if (
//       formData.pickupDate &&
//       formData.dropoffDate
//     ) {
//       calculation =
//         calculateBooking();
//     }
//   } catch (error) {
//     console.warn(
//       "Booking calculation:",
//       error.message
//     );
//   }

//   const {
//     days,
//     pricePerDay,
//     subtotal,
//     insurance,
//     tax,
//     total,
//   } = calculation;

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         {/* =====================================================
//             STEP INDICATOR
//         ====================================================== */}

//         <div className="flex justify-center items-center mb-10">
//           {[1, 2, 3].map((currentStep) => (
//             <React.Fragment
//               key={currentStep}
//             >
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
//                   currentStep <= step
//                     ? "bg-secondary text-white"
//                     : "bg-gray-300 text-gray-600"
//                 }`}
//               >
//                 {currentStep < step ? (
//                   <FiCheck />
//                 ) : (
//                   currentStep
//                 )}
//               </div>

//               {currentStep < 3 && (
//                 <div
//                   className={`w-12 h-1 transition-all ${
//                     currentStep < step
//                       ? "bg-secondary"
//                       : "bg-gray-300"
//                   }`}
//                 />
//               )}
//             </React.Fragment>
//           ))}
//         </div>

//         {/* =====================================================
//             MAIN GRID
//         ====================================================== */}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* ===================================================
//               LEFT SIDE
//           ==================================================== */}

//           <div className="lg:col-span-2">
//             {/* =================================================
//                 STEP 1
//             ================================================== */}

//             {step === 1 && (
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 className="bg-white p-8 rounded-xl card-shadow"
//               >
//                 <h2 className="text-2xl font-bold mb-6">
//                   Trip Details
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   {/* Pickup Date */}
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Pickup Date
//                     </label>

//                     <input
//                       type="date"
//                       name="pickupDate"
//                       value={
//                         formData.pickupDate
//                       }
//                       min={
//                         new Date()
//                           .toISOString()
//                           .split("T")[0]
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.pickupDate
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />

//                     {errors.pickupDate && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.pickupDate}
//                       </p>
//                     )}
//                   </div>

//                   {/* Dropoff Date */}
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Dropoff Date
//                     </label>

//                     <input
//                       type="date"
//                       name="dropoffDate"
//                       value={
//                         formData.dropoffDate
//                       }
//                       min={
//                         formData.pickupDate ||
//                         new Date()
//                           .toISOString()
//                           .split("T")[0]
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.dropoffDate
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />

//                     {errors.dropoffDate && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.dropoffDate}
//                       </p>
//                     )}
//                   </div>

//                   {/* Pickup Location */}
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Pickup Location
//                     </label>

//                     <select
//                       name="pickupLocation"
//                       value={
//                         formData.pickupLocation
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.pickupLocation
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       <option value="">
//                         Select Location
//                       </option>

//                       {locations.map(
//                         (loc) => (
//                           <option
//                             key={loc}
//                             value={loc}
//                           >
//                             {loc}
//                           </option>
//                         )
//                       )}
//                     </select>

//                     {errors.pickupLocation && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {
//                           errors.pickupLocation
//                         }
//                       </p>
//                     )}
//                   </div>

//                   {/* Dropoff Location */}
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Dropoff Location
//                     </label>

//                     <select
//                       name="dropoffLocation"
//                       value={
//                         formData.dropoffLocation
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.dropoffLocation
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       <option value="">
//                         Select Location
//                       </option>

//                       {locations.map(
//                         (loc) => (
//                           <option
//                             key={loc}
//                             value={loc}
//                           >
//                             {loc}
//                           </option>
//                         )
//                       )}
//                     </select>

//                     {errors.dropoffLocation && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {
//                           errors.dropoffLocation
//                         }
//                       </p>
//                     )}
//                   </div>

//                   {/* Trip Type */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold mb-2">
//                       Trip Type
//                     </label>

//                     <select
//                       name="tripType"
//                       value={
//                         formData.tripType
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.tripType
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       <option value="">
//                         Select Trip Type
//                       </option>

//                       <option value="SELF_DRIVE">
//                         Drive Yourself
//                       </option>

//                       <option value="HIRED_DRIVER">
//                         Hired Driver
//                       </option>
//                     </select>

//                     {errors.tripType && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.tripType}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={
//                     handleNextStep
//                   }
//                   disabled={
//                     documentLoading
//                   }
//                   className="btn-primary w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {documentLoading ? (
//                     <>
//                       <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

//                       Checking Documents...
//                     </>
//                   ) : (
//                     <>
//                       Continue
//                       <FiArrowRight />
//                     </>
//                   )}
//                 </button>
//               </motion.div>
//             )}

//             {/* =================================================
//                 STEP 2
//             ================================================== */}

//             {step === 2 && (
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 className="bg-white p-8 rounded-xl card-shadow"
//               >
//                 <h2 className="text-2xl font-bold mb-6">
//                   Driver Information
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   {/* First Name */}
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       First Name
//                     </label>

//                     <input
//                       type="text"
//                       name="firstName"
//                       value={
//                         formData.firstName
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.firstName
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />

//                     {errors.firstName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.firstName}
//                       </p>
//                     )}
//                   </div>

//                   {/* Last Name */}
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Last Name
//                     </label>

//                     <input
//                       type="text"
//                       name="lastName"
//                       value={
//                         formData.lastName
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.lastName
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />

//                     {errors.lastName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.lastName}
//                       </p>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Email
//                     </label>

//                     <input
//                       type="email"
//                       name="email"
//                       value={
//                         formData.email
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.email
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />

//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   {/* Phone */}
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Phone
//                     </label>

//                     <input
//                       type="tel"
//                       name="phone"
//                       value={
//                         formData.phone
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       maxLength={10}
//                       placeholder="10 digit mobile number"
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.phone
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />

//                     {errors.phone && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.phone}
//                       </p>
//                     )}
//                   </div>

//                   {/* License Number */}
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Driving License Number
//                     </label>

//                     <input
//                       type="text"
//                       name="licenseNumber"
//                       value={
//                         formData.licenseNumber
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       placeholder="Example: MH12 20230012345"
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.licenseNumber
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />

//                     {errors.licenseNumber && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {
//                           errors.licenseNumber
//                         }
//                       </p>
//                     )}
//                   </div>

//                   {/* License Expiry */}
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       License Expiry
//                     </label>

//                     <input
//                       type="date"
//                       name="licenseExpiry"
//                       value={
//                         formData.licenseExpiry
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.licenseExpiry
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />

//                     {errors.licenseExpiry && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {
//                           errors.licenseExpiry
//                         }
//                       </p>
//                     )}
//                   </div>

//                   {/* Aadhaar */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold mb-2">
//                       Aadhaar Number
//                     </label>

//                     <input
//                       type="text"
//                       name="aadhaarNumber"
//                       value={
//                         formData.aadhaarNumber
//                       }
//                       onChange={
//                         handleInputChange
//                       }
//                       maxLength={12}
//                       placeholder="12 digit Aadhaar number"
//                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
//                         errors.aadhaarNumber
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />

//                     {errors.aadhaarNumber && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {
//                           errors.aadhaarNumber
//                         }
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setStep(1)
//                     }
//                     className="btn-outline flex-1"
//                   >
//                     Back
//                   </button>

//                   <button
//                     type="button"
//                     onClick={
//                       handleNextStep
//                     }
//                     className="btn-primary flex-1 flex items-center justify-center gap-2"
//                   >
//                     Continue
//                     <FiArrowRight />
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* =================================================
//                 STEP 3
//             ================================================== */}

//             {step === 3 && (
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 className="bg-white p-8 rounded-xl card-shadow"
//               >
//                 <h2 className="text-2xl font-bold mb-6">
//                   Review Your Booking
//                 </h2>

//                 <div className="space-y-6">
//                   {/* Car Details */}
//                   <div className="border-b pb-6">
//                     <h3 className="font-bold mb-4">
//                       Car Details
//                     </h3>

//                     <div className="flex gap-4">
//                       <img
//                         src={getCarImageUrl(
//                           car.mainImage
//                         )}
//                         alt={
//                           car.name ||
//                           "Car"
//                         }
//                         className="w-20 h-18 rounded-lg object-contain bg-gray-100 border"
//                         onError={(e) => {
//                           e.currentTarget.src =
//                             "/placeholder-car.jpg";
//                         }}
//                       />

//                       <div>
//                         <p className="font-bold text-lg">
//                           {car.name}
//                         </p>

//                         <p className="text-gray-600">
//                           {car.brand}
//                         </p>

//                         <p className="text-secondary font-bold">
//                           {formatRupees(
//                             pricePerDay
//                           )}
//                           /day
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Trip Details */}
//                   <div className="border-b pb-6">
//                     <h3 className="font-bold mb-4">
//                       Trip Details
//                     </h3>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-gray-600 text-sm">
//                           Pickup
//                         </p>

//                         <p className="font-semibold">
//                           {
//                             formData.pickupDate
//                           }
//                         </p>

//                         <p className="text-gray-600">
//                           {
//                             formData.pickupLocation
//                           }
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-gray-600 text-sm">
//                           Dropoff
//                         </p>

//                         <p className="font-semibold">
//                           {
//                             formData.dropoffDate
//                           }
//                         </p>

//                         <p className="text-gray-600">
//                           {
//                             formData.dropoffLocation
//                           }
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-gray-600 text-sm">
//                           Trip Type
//                         </p>

//                         <p className="font-semibold">
//                           {formData.tripType ===
//                           "SELF_DRIVE"
//                             ? "Drive Yourself"
//                             : "Hired Driver"}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-gray-600 text-sm">
//                           Rental Days
//                         </p>

//                         <p className="font-semibold">
//                           {days}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Driver Details */}
//                   <div className="border-b pb-6">
//                     <h3 className="font-bold mb-4">
//                       Customer Details
//                     </h3>

//                     {formData.tripType ===
//                     "HIRED_DRIVER" ? (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             Name
//                           </p>

//                           <p className="font-semibold">
//                             {
//                               profileData?.firstName
//                             }{" "}
//                             {
//                               profileData?.lastName
//                             }
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             Email
//                           </p>

//                           <p className="font-semibold">
//                             {
//                               profileData?.email
//                             }
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             Phone
//                           </p>

//                           <p className="font-semibold">
//                             {
//                               profileData?.phone
//                             }
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             Name
//                           </p>

//                           <p className="font-semibold">
//                             {
//                               formData.firstName
//                             }{" "}
//                             {
//                               formData.lastName
//                             }
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             Email
//                           </p>

//                           <p className="font-semibold">
//                             {
//                               formData.email
//                             }
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             Phone
//                           </p>

//                           <p className="font-semibold">
//                             {
//                               formData.phone
//                             }
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             License Number
//                           </p>

//                           <p className="font-semibold">
//                             {
//                               formData.licenseNumber
//                             }
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             License Expiry
//                           </p>

//                           <p className="font-semibold">
//                             {
//                               formData.licenseExpiry
//                             }
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 text-sm">
//                             Aadhaar Number
//                           </p>

//                           <p className="font-semibold">
//                             XXXX XXXX{" "}
//                             {formData.aadhaarNumber.slice(
//                               -4
//                             )}
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Price */}
//                   <div>
//                     <h3 className="font-bold mb-4">
//                       Payment Summary
//                     </h3>

//                     <div className="space-y-3">
//                       <div className="flex justify-between">
//                         <span>
//                           Subtotal
//                         </span>

//                         <span className="font-semibold">
//                           {formatRupees(
//                             subtotal
//                           )}
//                         </span>
//                       </div>

//                       <div className="flex justify-between">
//                         <span>
//                           Insurance
//                         </span>

//                         <span className="font-semibold">
//                           {formatRupees(
//                             insurance
//                           )}
//                         </span>
//                       </div>

//                       <div className="flex justify-between">
//                         <span>
//                           Tax
//                         </span>

//                         <span className="font-semibold">
//                           {formatRupees(
//                             tax
//                           )}
//                         </span>
//                       </div>

//                       <div className="border-t pt-3 flex justify-between">
//                         <span className="font-bold text-lg">
//                           Total
//                         </span>

//                         <span className="font-bold text-xl text-secondary">
//                           {formatRupees(
//                             total
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="mt-8 border-t border-gray-200 pt-6">
//                   <div className="flex flex-col gap-3 sm:flex-row">
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setStep(
//                           formData.tripType ===
//                             "HIRED_DRIVER"
//                             ? 1
//                             : 2
//                         )
//                       }
//                       disabled={isLoading}
//                       className="flex-1 min-h-[50px] rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50"
//                     >
//                       Back
//                     </button>

//                     {/* WhatsApp */}
//                     <button
//                       type="button"
//                       onClick={
//                         handleBookViaWhatsApp
//                       }
//                       disabled={isLoading}
//                       className="flex-1 min-h-[50px] rounded-lg bg-[#25D366] px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1ebe5d] hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isLoading ? (
//                         <>
//                           <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

//                           Processing...
//                         </>
//                       ) : (
//                         <>
//                           <FiMessageCircle className="text-xl" />

//                           <span>
//                             Book via WhatsApp
//                           </span>
//                         </>
//                       )}
//                     </button>

//                     {/* Normal Booking */}
//                     <button
//                       type="button"
//                       onClick={
//                         handleConfirmBooking
//                       }
//                       disabled={isLoading}
//                       className="flex-1 min-h-[50px] rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isLoading ? (
//                         <>
//                           <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

//                           Processing...
//                         </>
//                       ) : (
//                         <>
//                           <FiCheck className="text-lg" />

//                           <span>
//                             Confirm Booking
//                           </span>
//                         </>
//                       )}
//                     </button>
//                   </div>

//                   <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
//                     <FiMessageCircle className="mt-0.5 shrink-0 text-lg text-[#25D366]" />

//                     <div>
//                       <p className="font-semibold text-green-800">
//                         Book quickly through WhatsApp
//                       </p>

//                       <p className="mt-1 text-sm text-green-700">
//                         Your booking will be
//                         saved in the system
//                         first, then WhatsApp
//                         will open with your
//                         booking details.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           {/* ===================================================
//               RIGHT SIDE - BOOKING SUMMARY
//           ==================================================== */}

//           <div className="lg:col-span-1">
//             <div className="bg-white p-8 rounded-xl card-shadow sticky top-24">
//               <h3 className="text-xl font-bold mb-6">
//                 Booking Summary
//               </h3>

//               {/* Car */}
//               <div className="mb-6 pb-6 border-b">
//                 <img
//                   src={getCarImageUrl(
//                     car.mainImage
//                   )}
//                   alt={
//                     car.name ||
//                     "Car"
//                   }
//                   className="w-20 h-16 rounded-lg object-contain bg-gray-100 border mb-3"
//                   onError={(e) => {
//                     e.currentTarget.src =
//                       "/placeholder-car.jpg";
//                   }}
//                 />

//                 <p className="font-bold text-lg">
//                   {car.name}
//                 </p>

//                 <p className="text-gray-600">
//                   {car.brand}
//                 </p>

//                 <div className="flex justify-between mt-3">
//                   <span className="text-gray-600">
//                     Trip Type
//                   </span>

//                   <span className="font-semibold">
//                     {formData.tripType ===
//                     "SELF_DRIVE"
//                       ? "Drive Yourself"
//                       : formData.tripType ===
//                         "HIRED_DRIVER"
//                       ? "Hired Driver"
//                       : "Not Selected"}
//                   </span>
//                 </div>
//               </div>

//               {/* Rental */}
//               <div className="space-y-3 mb-6 pb-6 border-b">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">
//                     Rental Days
//                   </span>

//                   <span className="font-semibold">
//                     {days}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">
//                     Daily Rate
//                   </span>

//                   <span className="font-semibold">
//                     {formatRupees(
//                       pricePerDay
//                     )}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">
//                     Subtotal
//                   </span>

//                   <span className="font-semibold">
//                     {formatRupees(
//                       subtotal
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {/* Charges */}
//               <div className="space-y-3 mb-6 pb-6 border-b">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">
//                     Insurance
//                   </span>

//                   <span className="font-semibold">
//                     {formatRupees(
//                       insurance
//                     )}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">
//                     Tax 10%
//                   </span>

//                   <span className="font-semibold">
//                     {formatRupees(
//                       tax
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {/* Total */}
//               <div className="flex justify-between mb-6">
//                 <span className="font-bold text-lg">
//                   Total
//                 </span>

//                 <span className="text-2xl font-bold text-secondary">
//                   {formatRupees(total)}
//                 </span>
//               </div>

//               {/* Benefits */}
//               <div className="bg-light p-4 rounded-lg text-sm text-gray-600">
//                 <p>
//                   ✓ Full insurance included
//                 </p>

//                 <p>
//                   ✓ Free cancellation up to
//                   24 hours
//                 </p>

//                 <p>
//                   ✓ 24/7 roadside assistance
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =======================================================
//           DOCUMENT MODAL
//       ======================================================== */}

//       {showDocumentMessage && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
//           onClick={() =>
//             setShowDocumentMessage(false)
//           }
//         >
//           <motion.div
//             initial={{
//               opacity: 0,
//               scale: 0.94,
//               y: 20,
//             }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//               y: 0,
//             }}
//             transition={{
//               duration: 0.2,
//             }}
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//             className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
//           >
//             {/* Header */}
//             <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
//                   <FiAlertCircle className="text-2xl text-red-600" />
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
//                     Document verification
//                     required
//                   </h3>

//                   <p className="mt-1 text-sm text-gray-500">
//                     Self-drive booking is
//                     available after document
//                     approval.
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowDocumentMessage(
//                     false
//                   )
//                 }
//                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
//                 aria-label="Close"
//               >
//                 <FiX className="text-xl" />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="px-5 py-6 sm:px-6">
//               <div
//                 className={`rounded-xl border p-4 ${
//                   documentStatus ===
//                   "REJECT"
//                     ? "border-red-200 bg-red-50"
//                     : documentStatus ===
//                       "PENDING"
//                     ? "border-yellow-200 bg-yellow-50"
//                     : "border-blue-200 bg-blue-50"
//                 }`}
//               >
//                 <div className="flex items-start gap-3">
//                   <FiFileText
//                     className={`mt-0.5 shrink-0 text-xl ${
//                       documentStatus ===
//                       "REJECT"
//                         ? "text-red-600"
//                         : documentStatus ===
//                           "PENDING"
//                         ? "text-yellow-600"
//                         : "text-blue-600"
//                     }`}
//                   />

//                   <div>
//                     <p className="font-semibold text-gray-900">
//                       {documentStatus ===
//                       "REJECT"
//                         ? "Your documents were rejected"
//                         : documentStatus ===
//                           "PENDING"
//                         ? "Your documents are under review"
//                         : "Documents have not been uploaded"}
//                     </p>

//                     <p className="mt-1 text-sm leading-6 text-gray-600">
//                       {documentStatus ===
//                       "REJECT"
//                         ? "Please review the rejection reason, upload corrected documents from your profile, and wait for administrator approval."
//                         : documentStatus ===
//                           "PENDING"
//                         ? "Your documents have been submitted successfully. Please wait until the administrator approves them."
//                         : "Please upload your Driving Licence and Aadhaar Card from your profile before continuing with a self-drive booking."}
//                     </p>

//                     {/* Rejection reason */}
//                     {documentStatus ===
//                       "REJECT" &&
//                       (documentData?.reason ||
//                         documentData?.rejectionReason) && (
//                         <div className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2">
//                           <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
//                             Rejection reason
//                           </p>

//                           <p className="mt-1 text-sm text-gray-700">
//                             {documentData?.reason ||
//                               documentData?.rejectionReason}
//                           </p>
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               </div>

//               <p className="mt-4 text-sm leading-6 text-gray-600">
//                 After your document status
//                 becomes{" "}
//                 <span className="font-bold text-green-700">
//                   ACCEPTED
//                 </span>
//                 , return to this page and
//                 continue your booking.
//               </p>
//             </div>

//             {/* Footer */}
//             <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowDocumentMessage(
//                     false
//                   )
//                 }
//                 className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
//               >
//                 Stay on Booking
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowDocumentMessage(
//                     false
//                   );

//                   navigate(
//                     "/dashboard",
//                     {
//                       state: {
//                         activeTab:
//                           "documents",
//                       },
//                     }
//                   );
//                 }}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
//               >
//                 <FiFileText />

//                 Go to Profile Documents
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* =======================================================
//           TOAST
//       ======================================================== */}

//       {toast && (
//         <div className="fixed bottom-8 right-8 z-50">
//           <Toast
//             message={toast.message}
//             type={toast.type}
//             onClose={() =>
//               setToast(null)
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiArrowRight,
  FiAlertCircle,
  FiFileText,
  FiX,
  FiMessageCircle,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import {
  validateEmail,
} from "../utils/helpers";
import Toast from "../components/Toast";

import {
  getUserByEmail,
  carBooking,
  getCarImageUrl,
  getUserDocuments,
  createWhatsAppBooking,
} from "../services/carService";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { addBooking } = useBooking();

  const car = location.state?.car;

  // ============================================================
  // STATE
  // ============================================================

  const [toast, setToast] = useState(null);

  const [step, setStep] = useState(1);

  const [profileData, setProfileData] = useState(null);

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [documentData, setDocumentData] = useState(null);

  const [documentStatus, setDocumentStatus] =
    useState("NOT_UPLOADED");

  const [documentLoading, setDocumentLoading] =
    useState(true);

  const [showDocumentMessage, setShowDocumentMessage] =
    useState(false);

  const [formData, setFormData] = useState({
    pickupDate: "",
    dropoffDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    tripType: "",

    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",

    licenseNumber: "",
    licenseExpiry: "",
    aadhaarNumber: "",

    insuranceType: "basic",

    additionalServices: [],
  });

  // ============================================================
  // CONSTANTS
  // ============================================================

  const locations = [
    "Mumbai",
    "Pune",
    "Nashik",
    "Nagpur",
    "Nandurbar",
  ];

  // Driver charges
  // Hired Driver = ₹500 per day
  const DRIVER_RATE_PER_DAY = 500;

  // ============================================================
  // FORMAT CURRENCY
  // ============================================================

  const formatRupees = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);
  };

  // ============================================================
  // DOCUMENT STATUS
  // ============================================================

  const normalizeDocumentStatus = (value) => {
    const status = String(value || "")
      .trim()
      .toUpperCase();

    if (
      status === "ACCEPT" ||
      status === "ACCEPTED" ||
      status === "APPROVED"
    ) {
      return "ACCEPT";
    }

    if (
      status === "REJECT" ||
      status === "REJECTED"
    ) {
      return "REJECT";
    }

    if (
      status === "PENDING" ||
      status === "UNDER_REVIEW"
    ) {
      return "PENDING";
    }

    return "NOT_UPLOADED";
  };

  // ============================================================
  // FETCH USER DOCUMENTS
  // ============================================================

  const fetchUserDocuments = async () => {
    try {
      setDocumentLoading(true);

      const response = await getUserDocuments();

      let latestDocument = response?.data ?? response;

      // If API returns an array, take latest document
      if (Array.isArray(latestDocument)) {
        latestDocument =
          latestDocument.length > 0
            ? latestDocument[latestDocument.length - 1]
            : null;
      }

      if (!latestDocument) {
        setDocumentData(null);
        setDocumentStatus("NOT_UPLOADED");

        setFormData((previous) => ({
          ...previous,
          licenseNumber: "",
          licenseExpiry: "",
          aadhaarNumber: "",
        }));

        return null;
      }

      console.log(
        "User Documents:",
        latestDocument
      );

      const status = normalizeDocumentStatus(
        latestDocument.status ??
          latestDocument.documentStatus ??
          latestDocument.verificationStatus
      );

      const rawLicenseExpiry =
        latestDocument.licenseExpiry ??
        latestDocument.drivingLicenseExpiry ??
        latestDocument.drivingLicenceExpiry ??
        "";

      const normalizedLicenseExpiry =
        rawLicenseExpiry
          ? String(rawLicenseExpiry).split("T")[0]
          : "";

      const licenseNumber =
        latestDocument.drivingLicenseNo ??
        latestDocument.drivingLicenseNumber ??
        latestDocument.drivingLicenceNumber ??
        latestDocument.licenseNumber ??
        "";

      const aadhaarNumber =
        latestDocument.aadharNo ??
        latestDocument.aadhaarNumber ??
        latestDocument.aadhaarCardNumber ??
        latestDocument.aadhharNumber ??
        "";

      setDocumentData(latestDocument);
      setDocumentStatus(status);

      setFormData((previous) => ({
        ...previous,
        licenseNumber,
        licenseExpiry: normalizedLicenseExpiry,
        aadhaarNumber,
      }));

      return {
        data: latestDocument,
        status,
      };
    } catch (error) {
      console.error(
        "Document Fetch Error:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setDocumentData(null);
      setDocumentStatus("NOT_UPLOADED");

      return null;
    } finally {
      setDocumentLoading(false);
    }
  };

  // ============================================================
  // FETCH USER PROFILE
  // ============================================================

  const fetchUserProfile = async () => {
    try {
      const email =
        localStorage.getItem("email") ||
        user?.email;

      if (!email) {
        return;
      }

      const data = await getUserByEmail(email);

      console.log("User Profile:", data);

      setProfileData(data);

      setFormData((previous) => ({
        ...previous,

        firstName:
          data?.firstName ||
          previous.firstName,

        lastName:
          data?.lastName ||
          previous.lastName,

        email:
          data?.email ||
          previous.email,

        phone:
          data?.phone ||
          previous.phone,
      }));
    } catch (error) {
      console.error(
        "Profile Fetch Error:",
        error?.response?.data ||
          error?.message ||
          error
      );
    }
  };

  // ============================================================
  // VALIDATION HELPERS
  // ============================================================

  const validateIndianPhone = (phone) => {
    return /^[6-9]\d{9}$/.test(
      String(phone || "")
    );
  };

  const validateAadhaar = (aadhaar) => {
    return /^\d{12}$/.test(
      String(aadhaar || "")
    );
  };

  const validateDrivingLicense = (license) => {
    return /^[A-Z]{2}\d{2}\s?\d{11}$/.test(
      String(license || "").toUpperCase()
    );
  };

  const isTodayOrFutureDate = (date) => {
    if (!date) {
      return false;
    }

    const selectedDate = new Date(date);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return selectedDate >= today;
  };

  // License should not be expired.
  // Expiry today is considered valid until the end of today.
  const isLicenseValid = (date) => {
    if (!date) {
      return false;
    }

    const expiryDate = new Date(date);

    expiryDate.setHours(23, 59, 59, 999);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return expiryDate >= today;
  };

  // ============================================================
  // HANDLE INPUT CHANGE
  // ============================================================

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let finalValue = value;

    if (name === "aadhaarNumber") {
      finalValue = value
        .replace(/\D/g, "")
        .slice(0, 12);
    }

    if (name === "phone") {
      finalValue = value
        .replace(/\D/g, "")
        .slice(0, 10);
    }

    if (name === "licenseNumber") {
      finalValue = value
        .toUpperCase()
        .slice(0, 16);
    }

    setFormData((previous) => ({
      ...previous,
      [name]: finalValue,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  // ============================================================
  // VALIDATE STEP 1
  // ============================================================

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.pickupDate) {
      newErrors.pickupDate =
        "Pickup date is required";
    } else if (
      !isTodayOrFutureDate(
        formData.pickupDate
      )
    ) {
      newErrors.pickupDate =
        "Pickup date cannot be in the past";
    }

    if (!formData.dropoffDate) {
      newErrors.dropoffDate =
        "Dropoff date is required";
    }

    if (
      formData.pickupDate &&
      formData.dropoffDate
    ) {
      const pickup = new Date(
        formData.pickupDate
      );

      const dropoff = new Date(
        formData.dropoffDate
      );

      if (dropoff <= pickup) {
        newErrors.dropoffDate =
          "Dropoff date must be after pickup date";
      }
    }

    if (!formData.pickupLocation) {
      newErrors.pickupLocation =
        "Pickup location is required";
    }

    if (!formData.dropoffLocation) {
      newErrors.dropoffLocation =
        "Dropoff location is required";
    }

    if (!formData.tripType) {
      newErrors.tripType =
        "Trip type is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ============================================================
  // VALIDATE STEP 2
  // ============================================================

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        "Last name is required";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email =
        "Valid email is required";
    }

    if (!validateIndianPhone(formData.phone)) {
      newErrors.phone =
        "Enter valid 10 digit Indian mobile number";
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber =
        "Driving license number is required";
    } else if (
      !validateDrivingLicense(
        formData.licenseNumber
      )
    ) {
      newErrors.licenseNumber =
        "Enter valid license number. Example: MH12 20230012345";
    }

    if (!formData.licenseExpiry) {
      newErrors.licenseExpiry =
        "License expiry date is required";
    } else if (
      !isLicenseValid(
        formData.licenseExpiry
      )
    ) {
      newErrors.licenseExpiry =
        "Driving license is expired";
    }

    if (!formData.aadhaarNumber) {
      newErrors.aadhaarNumber =
        "Aadhaar number is required";
    } else if (
      !validateAadhaar(
        formData.aadhaarNumber
      )
    ) {
      newErrors.aadhaarNumber =
        "Aadhaar number must be exactly 12 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ============================================================
  // CALCULATE BOOKING
  // SINGLE SOURCE OF TRUTH
  // ============================================================

  const calculateBooking = () => {
    if (!car) {
      throw new Error(
        "Car information is missing."
      );
    }

    const pickup = new Date(
      formData.pickupDate
    );

    const dropoff = new Date(
      formData.dropoffDate
    );

    const days = Math.ceil(
      (dropoff.getTime() -
        pickup.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (!Number.isFinite(days) || days <= 0) {
      throw new Error(
        "Invalid rental dates."
      );
    }

    const pricePerDay = Number(
      car?.price || 0
    );

    if (
      !Number.isFinite(pricePerDay) ||
      pricePerDay <= 0
    ) {
      throw new Error(
        "Invalid car price."
      );
    }

    // ==========================================================
    // CAR RENTAL
    // ==========================================================

    const subtotal =
      days * pricePerDay;

    // ==========================================================
    // HIRED DRIVER CHARGE
    // ₹500 PER DAY
    //
    // Self Drive  = ₹0
    // Hired Driver = ₹500 × days
    // ==========================================================

    const driverRatePerDay =
      formData.tripType ===
      "HIRED_DRIVER"
        ? DRIVER_RATE_PER_DAY
        : 0;

    const driverCost =
      days * driverRatePerDay;

    // ==========================================================
    // INSURANCE
    // Basic = 5%
    // Premium = 10%
    //
    // Insurance is calculated on car rental subtotal.
    // ==========================================================

    const insuranceRate =
      formData.insuranceType === "premium"
        ? 0.10
        : 0.05;

    const insurance =
      subtotal * insuranceRate;

    // ==========================================================
    // TAX
    //
    // Tax is calculated on:
    // Car subtotal
    // + Driver cost
    // + Insurance
    // ==========================================================

    const taxableAmount =
      subtotal +
      driverCost +
      insurance;

    const tax =
      taxableAmount * 0.10;

    // ==========================================================
    // FINAL TOTAL
    // ==========================================================

    const total =
      subtotal +
      driverCost +
      insurance +
      tax;

    return {
      days,

      pricePerDay,

      subtotal,

      driverRatePerDay,

      driverCost,

      insurance,

      insuranceRate,

      taxableAmount,

      tax,

      total,
    };
  };

  // ============================================================
  // GET USER ID
  // ============================================================

  const getUserId = () => {
    const userId = Number(
      localStorage.getItem("userId")
    );

    if (!userId) {
      throw new Error(
        "User ID is missing. Please login again."
      );
    }

    return userId;
  };

  // ============================================================
  // GET CAR ID
  // ============================================================

  const getCarId = () => {
    const carId =
      car?.carId ??
      car?.id ??
      car?.vehicleId;

    if (!carId) {
      throw new Error(
        "Car ID is missing. Please select the car again."
      );
    }

    return Number(carId);
  };

  // ============================================================
  // CREATE BOOKING PAYLOAD
  // ============================================================

  const createBookingPayload = () => {
    const userId = getUserId();

    const carId = getCarId();

    const calculation =
      calculateBooking();

    const payload = {
      userId,

      carId,

      pickupDate:
        formData.pickupDate,

      dropoffDate:
        formData.dropoffDate,

      pickupLocation:
        formData.pickupLocation,

      dropoffLocation:
        formData.dropoffLocation,

      tripDriverType:
        formData.tripType,

      days:
        calculation.days,

      price:
        calculation.pricePerDay,

      // ========================================================
      // DRIVER CHARGES
      // ========================================================

      driverRatePerDay:
        calculation.driverRatePerDay,

      driverCost:
        calculation.driverCost,

      // ========================================================
      // BILLING
      // ========================================================

      subtotal:
        calculation.subtotal,

      insurance:
        calculation.insurance,

      tax:
        calculation.tax,

      total:
        calculation.total,

      bookingStatus:
        "PENDING",
    };

    // Self-drive driver details
    if (
      formData.tripType ===
      "SELF_DRIVE"
    ) {
      payload.driverDetails = {
        firstName:
          formData.firstName ||
          profileData?.firstName ||
          "",

        lastName:
          formData.lastName ||
          profileData?.lastName ||
          "",

        email:
          formData.email ||
          profileData?.email ||
          "",

        phone:
          formData.phone ||
          profileData?.phone ||
          "",

        licenseNumber:
          formData.licenseNumber || "",

        licenseExpiry:
          formData.licenseExpiry || "",

        aadhaarNumber:
          formData.aadhaarNumber || "",
      };
    }

    console.log(
      "Booking Payload:",
      payload
    );

    return payload;
  };

  // ============================================================
  // EXTRACT BOOKING RESPONSE
  // ============================================================

  const extractBookingData = (response) => {
    if (!response) {
      return null;
    }

    // Array response
    if (Array.isArray(response)) {
      return (
        response[response.length - 1] ||
        null
      );
    }

    // Axios response
    if (
      response?.data &&
      typeof response.data === "object"
    ) {
      return response.data;
    }

    return response;
  };

  // ============================================================
  // HANDLE NEXT STEP
  // ============================================================

  const handleNextStep = async () => {
    // ==========================================================
    // STEP 1
    // ==========================================================

    if (step === 1) {
      if (!validateStep1()) {
        return;
      }

      // ========================================================
      // HIRED DRIVER
      //
      // No driving documents required.
      // Go directly to review.
      // ========================================================

      if (
        formData.tripType ===
        "HIRED_DRIVER"
      ) {
        setStep(3);
        return;
      }

      // ========================================================
      // SELF DRIVE
      // ========================================================

      const latestDocumentResult =
        await fetchUserDocuments();

      const latestStatus =
        latestDocumentResult?.status ||
        documentStatus;

      if (latestStatus !== "ACCEPT") {
        setShowDocumentMessage(true);
        return;
      }

      setStep(2);
      return;
    }

    // ==========================================================
    // STEP 2
    // ==========================================================

    if (step === 2) {
      if (!validateStep2()) {
        return;
      }

      setStep(3);
    }
  };

  // ============================================================
  // HANDLE NORMAL BOOKING
  // ============================================================

  const handleConfirmBooking = async () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    if (
      formData.tripType ===
        "SELF_DRIVE" &&
      !validateStep2()
    ) {
      setStep(2);
      return;
    }

    try {
      setIsLoading(true);

      const bookingPayload =
        createBookingPayload();

      console.log(
        "Sending normal booking:",
        bookingPayload
      );

      const response =
        await carBooking(
          bookingPayload
        );

      console.log(
        "Booking API Response:",
        response
      );

      const bookingData =
        extractBookingData(response);

      if (!bookingData) {
        throw new Error(
          "Booking was not saved properly."
        );
      }

      addBooking(bookingData);

      setToast({
        message:
          "Booking request sent to admin successfully!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error(
        "Booking Error:",
        error
      );

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Booking failed!";

      const lowerMessage =
        errorMessage.toLowerCase();

      if (
        lowerMessage.includes(
          "already booked"
        ) ||
        lowerMessage.includes(
          "already reserved"
        )
      ) {
        setToast({
          message:
            "This car is already booked for the selected dates. Please choose different dates.",
          type: "error",
        });
      } else {
        setToast({
          message: errorMessage,
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // BUILD WHATSAPP MESSAGE
  // ============================================================

  const buildWhatsAppMessage = (
    bookingPayload,
    bookingData
  ) => {
    const firstName =
      formData.firstName ||
      profileData?.firstName ||
      "";

    const lastName =
      formData.lastName ||
      profileData?.lastName ||
      "";

    const email =
      formData.email ||
      profileData?.email ||
      "";

    const phone =
      formData.phone ||
      profileData?.phone ||
      "";

    const customerName =
      `${firstName} ${lastName}`.trim();

    const tripTypeDisplay =
      bookingPayload.tripDriverType ===
      "SELF_DRIVE"
        ? "Drive Yourself"
        : bookingPayload.tripDriverType ===
          "HIRED_DRIVER"
        ? "Hired Driver"
        : bookingPayload.tripDriverType;

    // Mask Aadhaar
    let maskedAadhaar =
      "Not Provided";

    const aadhaar =
      formData.aadhaarNumber || "";

    if (aadhaar.length >= 4) {
      maskedAadhaar =
        `XXXX XXXX ${aadhaar.slice(-4)}`;
    }

    const bookingId =
      bookingData?.bookingId ||
      bookingData?.id ||
      "N/A";

    return `
🚗 *NEW CAR BOOKING REQUEST*

━━━━━━━━━━━━━━━━━━━━
📋 *BOOKING REFERENCE*
━━━━━━━━━━━━━━━━━━━━

Booking ID: ${bookingId}
Status: ${
      bookingPayload.bookingStatus ||
      "PENDING"
    }

━━━━━━━━━━━━━━━━━━━━
🚘 *CAR DETAILS*
━━━━━━━━━━━━━━━━━━━━

Car: ${car?.name || "N/A"}
Brand: ${car?.brand || "N/A"}
Car ID: ${bookingPayload.carId}
Daily Rate: ${formatRupees(
      bookingPayload.price
    )}

━━━━━━━━━━━━━━━━━━━━
📅 *TRIP DETAILS*
━━━━━━━━━━━━━━━━━━━━

Pickup Date: ${
      bookingPayload.pickupDate
    }
Dropoff Date: ${
      bookingPayload.dropoffDate
    }
Pickup Location: ${
      bookingPayload.pickupLocation
    }
Dropoff Location: ${
      bookingPayload.dropoffLocation
    }
Trip Type: ${tripTypeDisplay}
Rental Days: ${
      bookingPayload.days
    }

${
  bookingPayload.tripDriverType ===
  "HIRED_DRIVER"
    ? `
━━━━━━━━━━━━━━━━━━━━
🚕 *DRIVER CHARGES*
━━━━━━━━━━━━━━━━━━━━

Driver Rate: ${formatRupees(
        bookingPayload.driverRatePerDay
      )} / day
Driver Cost: ${formatRupees(
        bookingPayload.driverCost
      )}
`
    : ""
}

━━━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━━━━

User ID: ${
      bookingPayload.userId
    }
Name: ${customerName || "N/A"}
Email: ${email || "N/A"}
Phone: ${phone || "N/A"}

${
  bookingPayload.tripDriverType ===
  "SELF_DRIVE"
    ? `
━━━━━━━━━━━━━━━━━━━━
🪪 *DRIVER DETAILS*
━━━━━━━━━━━━━━━━━━━━

License Number: ${
        formData.licenseNumber ||
        "N/A"
      }
License Expiry: ${
        formData.licenseExpiry ||
        "N/A"
      }
Aadhaar: ${maskedAadhaar}
`
    : ""
}

━━━━━━━━━━━━━━━━━━━━
💰 *BOOKING SUMMARY*
━━━━━━━━━━━━━━━━━━━━

Car Rental: ${formatRupees(
      bookingPayload.subtotal
    )}

${
  bookingPayload.tripDriverType ===
  "HIRED_DRIVER"
    ? `Driver Charges: ${formatRupees(
        bookingPayload.driverCost
      )}`
    : ""
}

Insurance: ${formatRupees(
      bookingPayload.insurance
    )}

Tax: ${formatRupees(
      bookingPayload.tax
    )}

━━━━━━━━━━━━━━━━━━━━

*TOTAL: ${formatRupees(
      bookingPayload.total
    )}*

━━━━━━━━━━━━━━━━━━━━

Please confirm my car booking.

Thank you.
`.trim();
  };

  // ============================================================
  // HANDLE WHATSAPP BOOKING
  // ============================================================

  const handleBookViaWhatsApp = async () => {
    // Validate STEP 1
    if (!validateStep1()) {
      setStep(1);

      setToast({
        message:
          "Please complete all booking details first.",
        type: "error",
      });

      return;
    }

    // Validate STEP 2
    if (
      formData.tripType ===
        "SELF_DRIVE" &&
      !validateStep2()
    ) {
      setStep(2);

      setToast({
        message:
          "Please complete the driver details.",
        type: "error",
      });

      return;
    }

    try {
      setIsLoading(true);

      const bookingPayload =
        createBookingPayload();

      console.log(
        "WhatsApp Booking Payload:",
        bookingPayload
      );

      setToast({
        message:
          "Creating WhatsApp booking...",
        type: "success",
      });

      // ========================================================
      // CALL BACKEND
      // ========================================================

      const response =
        await createWhatsAppBooking(
          bookingPayload
        );

      console.log(
        "WhatsApp Booking Response:",
        response
      );

      // ========================================================
      // EXTRACT RESPONSE
      // ========================================================

      const responseData =
        response?.data ||
        response;

      const bookingData =
        responseData?.booking ||
        responseData?.bookingData ||
        responseData;

      const whatsappUrl =
        responseData?.whatsappUrl;

      // ========================================================
      // ADD BOOKING TO CONTEXT
      // ========================================================

      if (bookingData) {
        addBooking(bookingData);
      }

      // ========================================================
      // OPEN WHATSAPP
      // ========================================================

      if (whatsappUrl) {
        window.open(
          whatsappUrl,
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        // Fallback:
        // Build WhatsApp message on frontend
        const message =
          buildWhatsAppMessage(
            bookingPayload,
            bookingData
          );

        const whatsappNumber =
          "918378891656";

        const fallbackUrl =
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
          )}`;

        window.open(
          fallbackUrl,
          "_blank",
          "noopener,noreferrer"
        );
      }

      setToast({
        message:
          "Booking created successfully. WhatsApp is ready to send.",
        type: "success",
      });

      // Navigate after opening WhatsApp
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      console.error(
        "WhatsApp Booking Error:",
        error
      );

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "WhatsApp booking failed.";

      const lowerMessage =
        errorMessage.toLowerCase();

      if (
        lowerMessage.includes(
          "already booked"
        ) ||
        lowerMessage.includes(
          "already reserved"
        )
      ) {
        setToast({
          message:
            "This car is already booked for the selected dates. Please choose different dates.",
          type: "error",
        });
      } else {
        setToast({
          message: errorMessage,
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // FETCH DATA ON PAGE LOAD
  // ============================================================

  useEffect(() => {
    fetchUserProfile();
    fetchUserDocuments();
  }, []);

  // ============================================================
  // NO CAR
  // ============================================================

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">
            No Car Selected
          </h2>

          <button
            onClick={() =>
              navigate("/cars")
            }
            className="btn-primary px-6 py-3 rounded-lg"
          >
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // BOOKING SUMMARY CALCULATION
  // ============================================================

  let calculation = {
    days: 0,
    pricePerDay: Number(car?.price || 0),
    subtotal: 0,

    driverRatePerDay:
      formData.tripType ===
      "HIRED_DRIVER"
        ? DRIVER_RATE_PER_DAY
        : 0,

    driverCost: 0,

    insurance: 0,
    tax: 0,
    total: 0,
  };

  try {
    if (
      formData.pickupDate &&
      formData.dropoffDate
    ) {
      calculation =
        calculateBooking();
    }
  } catch (error) {
    console.warn(
      "Booking calculation:",
      error.message
    );
  }

  const {
    days,
    pricePerDay,
    subtotal,
    driverRatePerDay,
    driverCost,
    insurance,
    tax,
    total,
  } = calculation;

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">

        {/* =====================================================
            STEP INDICATOR
        ====================================================== */}

        <div className="flex justify-center items-center mb-10">
          {[1, 2, 3].map((currentStep) => (
            <React.Fragment
              key={currentStep}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep <= step
                    ? "bg-secondary text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {currentStep < step ? (
                  <FiCheck />
                ) : (
                  currentStep
                )}
              </div>

              {currentStep < 3 && (
                <div
                  className={`w-12 h-1 transition-all ${
                    currentStep < step
                      ? "bg-secondary"
                      : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ===================================================
              LEFT SIDE
          ==================================================== */}

          <div className="lg:col-span-2">

            {/* =================================================
                STEP 1
            ================================================== */}

            {step === 1 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-white p-8 rounded-xl card-shadow"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Trip Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                  {/* Pickup Date */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Pickup Date
                    </label>

                    <input
                      type="date"
                      name="pickupDate"
                      value={
                        formData.pickupDate
                      }
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={
                        handleInputChange
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.pickupDate
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.pickupDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pickupDate}
                      </p>
                    )}
                  </div>

                  {/* Dropoff Date */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Dropoff Date
                    </label>

                    <input
                      type="date"
                      name="dropoffDate"
                      value={
                        formData.dropoffDate
                      }
                      min={
                        formData.pickupDate ||
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={
                        handleInputChange
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.dropoffDate
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.dropoffDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dropoffDate}
                      </p>
                    )}
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Pickup Location
                    </label>

                    <select
                      name="pickupLocation"
                      value={
                        formData.pickupLocation
                      }
                      onChange={
                        handleInputChange
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.pickupLocation
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">
                        Select Location
                      </option>

                      {locations.map(
                        (loc) => (
                          <option
                            key={loc}
                            value={loc}
                          >
                            {loc}
                          </option>
                        )
                      )}
                    </select>

                    {errors.pickupLocation && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors.pickupLocation
                        }
                      </p>
                    )}
                  </div>

                  {/* Dropoff Location */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Dropoff Location
                    </label>

                    <select
                      name="dropoffLocation"
                      value={
                        formData.dropoffLocation
                      }
                      onChange={
                        handleInputChange
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.dropoffLocation
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">
                        Select Location
                      </option>

                      {locations.map(
                        (loc) => (
                          <option
                            key={loc}
                            value={loc}
                          >
                            {loc}
                          </option>
                        )
                      )}
                    </select>

                    {errors.dropoffLocation && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors.dropoffLocation
                        }
                      </p>
                    )}
                  </div>

                  {/* Trip Type */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Trip Type
                    </label>

                    <select
                      name="tripType"
                      value={
                        formData.tripType
                      }
                      onChange={
                        handleInputChange
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.tripType
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">
                        Select Trip Type
                      </option>

                      <option value="SELF_DRIVE">
                        Drive Yourself
                      </option>

                      <option value="HIRED_DRIVER">
                        Hired Driver
                      </option>
                    </select>

                    {errors.tripType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.tripType}
                      </p>
                    )}

                    {/* Driver pricing information */}
                    {formData.tripType ===
                      "HIRED_DRIVER" && (
                      <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-800">
                            Driver Charges
                          </span>

                          <span className="text-sm font-bold text-green-800">
                            {formatRupees(
                              DRIVER_RATE_PER_DAY
                            )}{" "}
                            / day
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-green-700">
                          A professional driver will
                          be provided with the car.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    handleNextStep
                  }
                  disabled={
                    documentLoading &&
                    formData.tripType ===
                      "SELF_DRIVE"
                  }
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {documentLoading &&
                  formData.tripType ===
                    "SELF_DRIVE" ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      Checking Documents...
                    </>
                  ) : (
                    <>
                      Continue
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* =================================================
                STEP 2
            ================================================== */}

            {step === 2 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-white p-8 rounded-xl card-shadow"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Driver Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={
                        formData.firstName
                      }
                      onChange={
                        handleInputChange
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.firstName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={
                        formData.lastName
                      }
                      onChange={
                        handleInputChange
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.lastName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleInputChange
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleInputChange
                      }
                      maxLength={10}
                      placeholder="10 digit mobile number"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* License Number */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Driving License Number
                    </label>

                    <input
                      type="text"
                      name="licenseNumber"
                      value={
                        formData.licenseNumber
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Example: MH12 20230012345"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.licenseNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.licenseNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors.licenseNumber
                        }
                      </p>
                    )}
                  </div>

                  {/* License Expiry */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      License Expiry
                    </label>

                    <input
                      type="date"
                      name="licenseExpiry"
                      value={
                        formData.licenseExpiry
                      }
                      onChange={
                        handleInputChange
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.licenseExpiry
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.licenseExpiry && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors.licenseExpiry
                        }
                      </p>
                    )}
                  </div>

                  {/* Aadhaar */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Aadhaar Number
                    </label>

                    <input
                      type="text"
                      name="aadhaarNumber"
                      value={
                        formData.aadhaarNumber
                      }
                      onChange={
                        handleInputChange
                      }
                      maxLength={12}
                      placeholder="12 digit Aadhaar number"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                        errors.aadhaarNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.aadhaarNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors.aadhaarNumber
                        }
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setStep(1)
                    }
                    className="btn-outline flex-1"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleNextStep
                    }
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    Continue
                    <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            )}

            {/* =================================================
                STEP 3
            ================================================== */}

            {step === 3 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-white p-8 rounded-xl card-shadow"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Review Your Booking
                </h2>

                <div className="space-y-6">

                  {/* =================================================
                      CAR DETAILS
                  ================================================== */}

                  <div className="border-b pb-6">
                    <h3 className="font-bold mb-4">
                      Car Details
                    </h3>

                    <div className="flex gap-4">
                      <img
                        src={getCarImageUrl(
                          car.mainImage
                        )}
                        alt={
                          car.name ||
                          "Car"
                        }
                        className="w-20 h-18 rounded-lg object-contain bg-gray-100 border"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/placeholder-car.jpg";
                        }}
                      />

                      <div>
                        <p className="font-bold text-lg">
                          {car.name}
                        </p>

                        <p className="text-gray-600">
                          {car.brand}
                        </p>

                        <p className="text-secondary font-bold">
                          {formatRupees(
                            pricePerDay
                          )}
                          /day
                        </p>

                        {formData.tripType ===
                          "HIRED_DRIVER" && (
                          <p className="mt-1 text-sm font-semibold text-green-600">
                            +{" "}
                            {formatRupees(
                              DRIVER_RATE_PER_DAY
                            )}{" "}
                            /day driver
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      TRIP DETAILS
                  ================================================== */}

                  <div className="border-b pb-6">
                    <h3 className="font-bold mb-4">
                      Trip Details
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600 text-sm">
                          Pickup
                        </p>

                        <p className="font-semibold">
                          {
                            formData.pickupDate
                          }
                        </p>

                        <p className="text-gray-600">
                          {
                            formData.pickupLocation
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-600 text-sm">
                          Dropoff
                        </p>

                        <p className="font-semibold">
                          {
                            formData.dropoffDate
                          }
                        </p>

                        <p className="text-gray-600">
                          {
                            formData.dropoffLocation
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-600 text-sm">
                          Trip Type
                        </p>

                        <p className="font-semibold">
                          {formData.tripType ===
                          "SELF_DRIVE"
                            ? "Drive Yourself"
                            : "Hired Driver"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-600 text-sm">
                          Rental Days
                        </p>

                        <p className="font-semibold">
                          {days}
                        </p>
                      </div>

                      {/* Driver rate */}
                      {formData.tripType ===
                        "HIRED_DRIVER" && (
                        <div className="col-span-2 rounded-lg bg-green-50 border border-green-200 p-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-green-700">
                              Driver Rate
                            </span>

                            <span className="font-bold text-green-800">
                              {formatRupees(
                                driverRatePerDay
                              )}{" "}
                              / day
                            </span>
                          </div>

                          <div className="flex justify-between mt-1">
                            <span className="text-sm text-green-700">
                              Driver Charges
                            </span>

                            <span className="font-bold text-green-800">
                              {formatRupees(
                                driverCost
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* =================================================
                      CUSTOMER / DRIVER DETAILS
                  ================================================== */}

                  <div className="border-b pb-6">
                    <h3 className="font-bold mb-4">
                      Customer Details
                    </h3>

                    {formData.tripType ===
                    "HIRED_DRIVER" ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">
                            Name
                          </p>

                          <p className="font-semibold">
                            {
                              profileData?.firstName
                            }{" "}
                            {
                              profileData?.lastName
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            Email
                          </p>

                          <p className="font-semibold">
                            {
                              profileData?.email
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            Phone
                          </p>

                          <p className="font-semibold">
                            {
                              profileData?.phone
                            }
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">
                            Name
                          </p>

                          <p className="font-semibold">
                            {
                              formData.firstName
                            }{" "}
                            {
                              formData.lastName
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            Email
                          </p>

                          <p className="font-semibold">
                            {
                              formData.email
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            Phone
                          </p>

                          <p className="font-semibold">
                            {
                              formData.phone
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            License Number
                          </p>

                          <p className="font-semibold">
                            {
                              formData.licenseNumber
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            License Expiry
                          </p>

                          <p className="font-semibold">
                            {
                              formData.licenseExpiry
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            Aadhaar Number
                          </p>

                          <p className="font-semibold">
                            XXXX XXXX{" "}
                            {formData.aadhaarNumber.slice(
                              -4
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* =================================================
                      PRICE / PAYMENT SUMMARY
                  ================================================== */}

                  <div>
                    <h3 className="font-bold mb-4">
                      Payment Summary
                    </h3>

                    <div className="space-y-3">

                      {/* Car rental */}
                      <div className="flex justify-between">
                        <span>
                          Car Rental
                        </span>

                        <span className="font-semibold">
                          {formatRupees(
                            subtotal
                          )}
                        </span>
                      </div>

                      {/* Driver charges */}
                      {formData.tripType ===
                        "HIRED_DRIVER" && (
                        <div className="flex justify-between text-green-700">
                          <span>
                            Driver Charges
                            <span className="ml-1 text-xs text-gray-500">
                              (
                              {formatRupees(
                                driverRatePerDay
                              )}
                              /day)
                            </span>
                          </span>

                          <span className="font-semibold">
                            {formatRupees(
                              driverCost
                            )}
                          </span>
                        </div>
                      )}

                      {/* Insurance */}
                      <div className="flex justify-between">
                        <span>
                          Insurance
                        </span>

                        <span className="font-semibold">
                          {formatRupees(
                            insurance
                          )}
                        </span>
                      </div>

                      {/* Tax */}
                      <div className="flex justify-between">
                        <span>
                          Tax 10%
                        </span>

                        <span className="font-semibold">
                          {formatRupees(
                            tax
                          )}
                        </span>
                      </div>

                      {/* Total */}
                      <div className="border-t pt-3 flex justify-between">
                        <span className="font-bold text-lg">
                          Total
                        </span>

                        <span className="font-bold text-xl text-secondary">
                          {formatRupees(
                            total
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    BUTTONS
                ================================================== */}

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="flex flex-col gap-3 sm:flex-row">

                    {/* Back */}
                    <button
                      type="button"
                      onClick={() =>
                        setStep(
                          formData.tripType ===
                            "HIRED_DRIVER"
                            ? 1
                            : 2
                        )
                      }
                      disabled={isLoading}
                      className="flex-1 min-h-[50px] rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50"
                    >
                      Back
                    </button>

                    {/* WhatsApp */}
                    <button
                      type="button"
                      onClick={
                        handleBookViaWhatsApp
                      }
                      disabled={isLoading}
                      className="flex-1 min-h-[50px] rounded-lg bg-[#25D366] px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1ebe5d] hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                          Processing...
                        </>
                      ) : (
                        <>
                          <FiMessageCircle className="text-xl" />

                          <span>
                            Book via WhatsApp
                          </span>
                        </>
                      )}
                    </button>

                    {/* Normal Booking */}
                    <button
                      type="button"
                      onClick={
                        handleConfirmBooking
                      }
                      disabled={isLoading}
                      className="flex-1 min-h-[50px] rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                          Processing...
                        </>
                      ) : (
                        <>
                          <FiCheck className="text-lg" />

                          <span>
                            Confirm Booking
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                    <FiMessageCircle className="mt-0.5 shrink-0 text-lg text-[#25D366]" />

                    <div>
                      <p className="font-semibold text-green-800">
                        Book quickly through WhatsApp
                      </p>

                      <p className="mt-1 text-sm text-green-700">
                        Your booking will be
                        saved in the system
                        first, then WhatsApp
                        will open with your
                        booking details.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ===================================================
              RIGHT SIDE - BOOKING SUMMARY
          ==================================================== */}

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl card-shadow sticky top-24">

              <h3 className="text-xl font-bold mb-6">
                Booking Summary
              </h3>

              {/* =================================================
                  CAR
              ================================================== */}

              <div className="mb-6 pb-6 border-b">
                <img
                  src={getCarImageUrl(
                    car.mainImage
                  )}
                  alt={
                    car.name ||
                    "Car"
                  }
                  className="w-20 h-16 rounded-lg object-contain bg-gray-100 border mb-3"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder-car.jpg";
                  }}
                />

                <p className="font-bold text-lg">
                  {car.name}
                </p>

                <p className="text-gray-600">
                  {car.brand}
                </p>

                <div className="flex justify-between mt-3">
                  <span className="text-gray-600">
                    Trip Type
                  </span>

                  <span className="font-semibold">
                    {formData.tripType ===
                    "SELF_DRIVE"
                      ? "Drive Yourself"
                      : formData.tripType ===
                        "HIRED_DRIVER"
                      ? "Hired Driver"
                      : "Not Selected"}
                  </span>
                </div>
              </div>

              {/* =================================================
                  RENTAL
              ================================================== */}

              <div className="space-y-3 mb-6 pb-6 border-b">

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Rental Days
                  </span>

                  <span className="font-semibold">
                    {days}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Daily Rate
                  </span>

                  <span className="font-semibold">
                    {formatRupees(
                      pricePerDay
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Car Rental
                  </span>

                  <span className="font-semibold">
                    {formatRupees(
                      subtotal
                    )}
                  </span>
                </div>

                {/* =================================================
                    DRIVER CHARGE
                ================================================== */}

                {formData.tripType ===
                  "HIRED_DRIVER" && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3">

                    <div className="flex justify-between">
                      <span className="text-green-700">
                        Driver Rate
                      </span>

                      <span className="font-semibold text-green-800">
                        {formatRupees(
                          driverRatePerDay
                        )}
                        /day
                      </span>
                    </div>

                    <div className="flex justify-between mt-1">
                      <span className="font-semibold text-green-800">
                        Driver Charges
                      </span>

                      <span className="font-bold text-green-800">
                        {formatRupees(
                          driverCost
                        )}
                      </span>
                    </div>

                  </div>
                )}
              </div>

              {/* =================================================
                  CHARGES
              ================================================== */}

              <div className="space-y-3 mb-6 pb-6 border-b">

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Insurance
                  </span>

                  <span className="font-semibold">
                    {formatRupees(
                      insurance
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Tax 10%
                  </span>

                  <span className="font-semibold">
                    {formatRupees(
                      tax
                    )}
                  </span>
                </div>
              </div>

              {/* =================================================
                  TOTAL
              ================================================== */}

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg">
                  Total
                </span>

                <span className="text-2xl font-bold text-secondary">
                  {formatRupees(total)}
                </span>
              </div>

              {/* =================================================
                  DRIVER INFORMATION
              ================================================== */}

              {formData.tripType ===
                "HIRED_DRIVER" && (
                <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">

                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-blue-800">
                      Hired Driver
                    </p>

                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
                      +₹500/day
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-blue-700">
                    Car rental includes a
                    professional driver for
                    your trip.
                  </p>
                </div>
              )}

              {/* =================================================
                  BENEFITS
              ================================================== */}

              <div className="bg-light p-4 rounded-lg text-sm text-gray-600">
                <p>
                  ✓ Full insurance included
                </p>

                <p>
                  ✓ Free cancellation up to
                  24 hours
                </p>

                <p>
                  ✓ 24/7 roadside assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          DOCUMENT MODAL
      ======================================================== */}

      {showDocumentMessage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() =>
            setShowDocumentMessage(false)
          }
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >

            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-6">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                  <FiAlertCircle className="text-2xl text-red-600" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    Document verification
                    required
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Self-drive booking is
                    available after document
                    approval.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDocumentMessage(
                    false
                  )
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-6 sm:px-6">

              <div
                className={`rounded-xl border p-4 ${
                  documentStatus ===
                  "REJECT"
                    ? "border-red-200 bg-red-50"
                    : documentStatus ===
                      "PENDING"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-blue-200 bg-blue-50"
                }`}
              >

                <div className="flex items-start gap-3">

                  <FiFileText
                    className={`mt-0.5 shrink-0 text-xl ${
                      documentStatus ===
                      "REJECT"
                        ? "text-red-600"
                        : documentStatus ===
                          "PENDING"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  />

                  <div>

                    <p className="font-semibold text-gray-900">
                      {documentStatus ===
                      "REJECT"
                        ? "Your documents were rejected"
                        : documentStatus ===
                          "PENDING"
                        ? "Your documents are under review"
                        : "Documents have not been uploaded"}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {documentStatus ===
                      "REJECT"
                        ? "Please review the rejection reason, upload corrected documents from your profile, and wait for administrator approval."
                        : documentStatus ===
                          "PENDING"
                        ? "Your documents have been submitted successfully. Please wait until the administrator approves them."
                        : "Please upload your Driving Licence and Aadhaar Card from your profile before continuing with a self-drive booking."}
                    </p>

                    {/* Rejection reason */}
                    {documentStatus ===
                      "REJECT" &&
                      (documentData?.reason ||
                        documentData?.rejectionReason) && (
                        <div className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2">

                          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                            Rejection reason
                          </p>

                          <p className="mt-1 text-sm text-gray-700">
                            {documentData?.reason ||
                              documentData?.rejectionReason}
                          </p>

                        </div>
                      )}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                After your document status
                becomes{" "}
                <span className="font-bold text-green-700">
                  ACCEPTED
                </span>
                , return to this page and
                continue your booking.
              </p>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

              <button
                type="button"
                onClick={() =>
                  setShowDocumentMessage(
                    false
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
              >
                Stay on Booking
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDocumentMessage(
                    false
                  );

                  navigate(
                    "/dashboard",
                    {
                      state: {
                        activeTab:
                          "documents",
                      },
                    }
                  );
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
              >
                <FiFileText />

                Go to Profile Documents
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* =======================================================
          TOAST
      ======================================================== */}

      {toast && (
        <div className="fixed bottom-8 right-8 z-50">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToast(null)
            }
          />
        </div>
      )}
    </div>
  );
};

export default Booking;
