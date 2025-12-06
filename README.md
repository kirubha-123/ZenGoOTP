# ZenGoOTP – Firebase Phone OTP Demo (Expo)

This project is a demo implementation of phone-number login with OTP for the existing ZenGo app (`com.zencab.ZenGo`), built using Expo (managed workflow) and Firebase Authentication.

## Tech stack

- Expo (React Native, managed workflow)
- Firebase Authentication – Phone provider
- `expo-firebase-recaptcha` with invisible reCAPTCHA
- `firebase` JS SDK v9+

## Features

- Phone number input screen styled for ZenGo.
- Integration with Firebase Phone Auth using `signInWithPhoneNumber`.
- reCAPTCHA protection using `FirebaseRecaptchaVerifierModal` with `attemptInvisibleVerification={true}` so verification is invisible when possible and falls back to visible reCAPTCHA only when needed. [web:46][web:18]
- Second step to enter and verify the OTP code (demo flow).

## Implementation details

- Firebase project: **ZenGoOTP**  
- Android app registered with package name: **`com.zencab.ZenGo`**  
- Web app created to obtain `firebaseConfig`, used in `firebase.ts`. [web:12]
- `firebase.ts` initializes the Firebase app and exports:
  - `firebaseConfig` – passed into `FirebaseRecaptchaVerifierModal`
  - `auth` – used by `signInWithPhoneNumber`.

Core flow:

1. User enters a 10‑digit mobile number and taps **Send OTP**.
2. `FirebaseRecaptchaVerifierModal` runs in invisible mode and validates the request.
3. `signInWithPhoneNumber(auth, '+91' + phoneNumber, recaptchaVerifier)` is called.
4. On success, a confirmation object is stored and the UI shows an input for the 6‑digit OTP.
5. User enters the code and the app calls `confirmation.confirm(code)` to complete sign‑in.

## Note about SMS / billing

The Firebase project is currently on the **Spark (no-cost)** plan.  
Firebase has changed phone auth so that sending real SMS requires billing to be enabled; on Spark, calling `signInWithPhoneNumber` returns the error **`auth/billing-not-enabled`**. [web:49][web:54]

For this assignment:

- The complete phone-auth + invisible reCAPTCHA flow is implemented in the Expo app.
- The UI and Firebase calls are ready for production.
- Once the Firebase project is upgraded to a billing-enabled plan (Blaze) and phone auth SMS is enabled, OTP SMS will work without any code changes. [web:34][web:55]

npm install
npx expo start

- Scan the QR code with Expo Go (Android).
- Enter a phone number and tap **Send OTP** to exercise the flow.
## How to run

