import { Button, Flex, TextInput, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  RiAddFill,
  RiDeleteBinFill,
  RiPencilFill,
  RiSearchLine
} from "react-icons/ri";
import TableList from "@/components/TableList";

// Axios
import axios from "axios";

// Prisma
import { prisma } from "prisma/client";

// export async function getServerSideProps() {
//   const initialData = await prisma.student.findMany({
//     include: {
//       profile: {
//         select: {
//           fullName: true,
//           email: true,
//           password: true
//         }
//       }
//     }
//   });

//   return {
//     props: { initialData }
//   };
// }

function Index({ initialData }: any) {
  const [students, setStudents] = useState<Student[]>([]);

  return (
    <Flex direction="column" gap="md">
      <Title order={1}>Daftar Siswa</Title>
      <Flex direction="column" gap="md">
        <Flex justify="space-between" mr="xl">
          <Flex gap="sm">
            <Button
              leftIcon={<RiAddFill />}
              component={Link}
              href="/d/siswa/tambah">
              Tambah Siswa
            </Button>
            <Button
              variant="outline"
              leftIcon={<RiPencilFill />}
              component={Link}
              href="/d/siswa/edit">
              Edit
            </Button>
            <Button variant="outline" leftIcon={<RiDeleteBinFill />}>
              Hapus
            </Button>
          </Flex>
          <TextInput icon={<RiSearchLine />} placeholder="Cari siswa..." />
        </Flex>
        <TableList
          data={students}
          ths={[
            "No. Absen",
            "Nama Lengkap",
            "Kelas",
            "NIS",
            "Kata Sandi",
            "No. Telpon"
          ]}
        />
      </Flex>
    </Flex>
  );
}

export default Index;
