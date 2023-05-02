import { rand, randFullName, randNumber } from "@ngneat/falso";
import { prisma } from "@/lib/prisma";

const LENGTH_DATA = 10;

async function main() {
  // Ga perlu di loop
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

  for (let index = 0; index < LENGTH_DATA; index++) {
    await prisma.student.create({
      data: {
        nis: `${randNumber({ min: 1000000000000, max: 9999999999999 })}`,
        placement: "XII RPL A",
        absenceId: randNumber({ min: 1000, max: 9999 }),
        fullName: randFullName({ withAccents: false })
      }
    });

    await prisma.administrator.create({
      data: {
        nip: `${randNumber({ min: 1000000000000, max: 9999999999999 })}`,
        level: rand(["HIGHEST", "BASIC"]),
        access: "ALL",
        fullName: randFullName({ withAccents: false }),
        phoneNumber: `08${randNumber({ min: 100_000_000, max: 999_999_999 })}`
      }
    });

    await prisma.presence.create({
      data: {
        open: index == 0 ? true : false
      }
    });
  }

  // console.log(major);

  // console.log(student);

  // console.log(administrator);

  // console.log(precense);
}

main().catch((error) => console.log(error));

