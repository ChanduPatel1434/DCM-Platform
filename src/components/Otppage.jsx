// import { ArrowRight, Loader2, Mail, UserX, Shield } from "lucide-react";
// import { Suspense, useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { motion } from "framer-motion";
// const OtpPage=()=>{
//     return <>
//     {/* Card Header */}
// <div className="text-center">
//   <div className="flex justify-center">
//     <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-4">
//       <Mail className="h-8 w-8 text-green-600" />
//     </div>
//   </div>
//   <h2 className="text-2xl font-bold">Check Your Gmail</h2>
//   <p className="text-base">
//     We've sent a 6-digit code to <br />
//     <span className="font-medium text-blue-600">{step.email}</span>
//   </p>
// </div>

// <form onSubmit={handleOtpSubmit}>
//   {/* Card Content */}
//   <div className="pb-4 space-y-4">
//     <input type="hidden" name="email" value={step.email} />
//     <input type="hidden" name="code" value={otp} />

//     <div className="flex justify-center">
//       <InputOTP
//         value={otp}
//         onChange={setOtp}
//         maxLength={6}
//         disabled={isLoading}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" && otp.length === 6 && !isLoading) {
//             const form = (e.target ).closest("form");
//             if (form) {
//               form.requestSubmit();
//             }
//           }
//         }}
//       >
//         <InputOTPGroup>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <InputOTPSlot
//               key={index}
//               index={index}
//               className="w-12 h-12 text-lg"
//             />
//           ))}
//         </InputOTPGroup>
//       </InputOTP>
//     </div>

//     {error && (
//       <motion.p
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-lg"
//       >
//         {error}
//       </motion.p>
//     )}

//     <p className="text-sm text-muted-foreground text-center">
//       Didn't receive the code?{" "}
//       <button
//         variant="link"
//         className="p-0 h-auto text-blue-600"
//         onClick={() => setStep("signIn")}
//       >
//         Try again
//       </button>
//     </p>
//   </div>

//   {/* Card Footer */}
//   <div className="flex flex-col gap-3">
//     <Button
//       type="submit"
//       className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//       disabled={isLoading || otp.length !== 6}
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Verifying...
//         </>
//       ) : (
//         <>
//           Verify Gmail Account
//           <ArrowRight className="ml-2 h-4 w-4" />
//         </>
//       )}
//     </Button>
//     <Button
//       type="button"
//       variant="ghost"
//       onClick={() => setStep("signIn")}
//       disabled={isLoading}
//       className="w-full"
//     >
//       Use different email
//     </Button>
//   </div>
// </form></>
// }
// export default OtpPage