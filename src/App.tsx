// import { useEffect } from 'react';
// import { db } from './config/firebase'; // Import file vừa tạo
// import { collection, getDocs } from 'firebase/firestore';

// function App() {
//   useEffect(() => {
//     const testConnection = async () => {
//       try {
//         // Thử lấy data từ một collection bất kỳ (ví dụ 'users' hoặc 'test')
//         // Nếu DB chưa có collection nào thì nó trả về rỗng, nhưng không lỗi là OK.
//         //const querySnapshot = await getDocs(collection(db, "test_connection"));
//         console.log("✅ Kết nối Firebase thành công!");
//       } catch (error) {
//         console.error("❌ Lỗi kết nối Firebase:", error);
//       }
//     };

//     testConnection();
//   }, []);

//   return (
//     <div className="p-10 text-center">
//       <h1 className="text-3xl font-bold text-blue-600">
//         MemoryWord - Firebase Setup
//       </h1>
//       <p>Bật F12 (Console) để xem trạng thái kết nối.</p>
//     </div>
//   );
// }

// export default App;