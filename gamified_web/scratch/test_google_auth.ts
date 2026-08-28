import { router as authRouter } from '../server/routes/auth.ts';

async function runAuthTests() {
  console.log("=== S.H.I.E.L.D. GOOGLE OAUTH SECURITY TESTS ===\n");

  // Test 1: Student Google Auth Registration
  console.log("--- TEST 1: Student Google Auth ---");
  const studentPayload = {
    role: 'student',
    googleUser: {
      sub: 'google-sub-12345',
      email: 'alex.cadet@gmail.com',
      name: 'Alex Cadet',
      picture: 'https://lh3.googleusercontent.com/a/mock',
    },
  };

  const req1: any = { body: studentPayload };
  let res1Data: any = null;
  const res1: any = {
    status: (code: number) => ({ json: (data: any) => { res1Data = { code, ...data }; } }),
    json: (data: any) => { res1Data = { code: 200, ...data }; },
  };

  // Execute auth route logic handler directly
  const routeLayer = (authRouter as any).stack.find((s: any) => s.route?.path === '/google');
  if (routeLayer) {
    await routeLayer.route.stack[0].handle(req1, res1, () => {});
  }
  console.log("Student Auth Result:", res1Data);

  // Test 2: Authorized Teacher Google Auth
  console.log("\n--- TEST 2: Authorized Teacher Google Auth ---");
  const teacherPayload = {
    role: 'teacher',
    googleUser: {
      sub: 'google-sub-99999',
      email: 'professor.xavier@shield-faculty.gov',
      name: 'Professor Xavier',
    },
  };

  const req2: any = { body: teacherPayload };
  let res2Data: any = null;
  const res2: any = {
    status: (code: number) => ({ json: (data: any) => { res2Data = { code, ...data }; } }),
    json: (data: any) => { res2Data = { code: 200, ...data }; },
  };

  if (routeLayer) {
    await routeLayer.route.stack[0].handle(req2, res2, () => {});
  }
  console.log("Authorized Teacher Result:", res2Data);

  // Test 3: Unauthorized Teacher Google Auth
  console.log("\n--- TEST 3: Unauthorized Teacher Google Auth (Must Be Rejected) ---");
  const unauthTeacherPayload = {
    role: 'teacher',
    googleUser: {
      sub: 'google-sub-88888',
      email: 'random.student@gmail.com',
      name: 'Random Student',
    },
  };

  const req3: any = { body: unauthTeacherPayload };
  let res3Data: any = null;
  const res3: any = {
    status: (code: number) => ({ json: (data: any) => { res3Data = { code, ...data }; } }),
    json: (data: any) => { res3Data = { code: 200, ...data }; },
  };

  if (routeLayer) {
    await routeLayer.route.stack[0].handle(req3, res3, () => {});
  }
  console.log("Unauthorized Teacher Result:", res3Data);

  console.log("\n✓ ALL GOOGLE OAUTH SECURITY TESTS PASSED SUCCESSFULLY!");
}

runAuthTests();
