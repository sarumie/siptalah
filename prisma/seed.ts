import { prisma } from "./client";

async function primayState() {
  // Major Data
  const major = await prisma.major.createMany({
    data: [
      {
        name: "Rekayasa Perangkat Lunak",
        acronym: "RPL",
        class: {
          set: ["X", "XI", "XII"]
        },
        group: {
          set: ["A", "B", "C"]
        }
      },
      {
        name: "Multimedia",
        acronym: "MM",
        class: {
          set: ["X", "XI", "XII", "XIII"]
        },
        group: {
          set: ["A", "B"]
        }
      },
      {
        name: "Teknik Komputer dan Jaringan",
        acronym: "TKJ",
        class: {
          set: ["X", "XI", "XII"]
        },
        group: {
          set: ["A", "B", "C", "D"]
        }
      }
    ],
    skipDuplicates: true
  });

  // Student Data
  const student = await prisma.student.create({
    data: {
      id: 1,
      absenceId: 1,
      nis: "212001475065",
      placement: "XI RPL A",
      profile: {
        create: {
          fullName: "Abdul Aziz Rahmat Ibnu Fani",
          email: "abdulaziz50024@gmail.com",
          password: "kamadoNezuko123$$"
        }
      }
    },
    include: {
      profile: true
    }
  });

  // Administrator
  const administrator = await prisma.administrator.create({
    data: {
      id: 1,
      nip: "1023948109284",
      role: "HIGHEST",
      access: "ALL",
      profile: {
        create: {
          fullName: "Supardi Mardi",
          email: "mardikece@gmail.com",
          password: "kamasfasf1aqfdsf"
        }
      }
    },
    include: {
      profile: true
    }
  });

  // Presence
  const precense = await prisma.presence.create({
    data: {
      open: true
    }
  });

  console.log(major);

  console.log(student);

  console.log(administrator);

  console.log(precense);
}

primayState().catch((error) => console.log(error));
