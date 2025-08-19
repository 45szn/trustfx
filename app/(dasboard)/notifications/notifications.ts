// const markAsRead = async (id: string) => {
//   if (!user) return;

//   try {
//     // Optimistically update UI
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
//     );

//     // Persist change in Firestore
//     const notifRef = doc(db, `users/${user.uid}/notifications`, id);
//     await updateDoc(notifRef, { read: true });
//   } catch (error) {
//     console.error("Error updating notification:", error);
//   }
// };

// const markAllAsRead = async () => {
//   if (!user) return;

//   const batch = writeBatch(db);
//   const unread = notifications.filter((n) => !n.read);

//   unread.forEach((n) => {
//     const ref = doc(db, `users/${user.uid}/notifications`, n.id);
//     batch.update(ref, { read: true });
//   });

//   try {
//     await batch.commit();
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//   } catch (err) {
//     console.error("Failed to mark all notifications as read:", err);
//   }
// };
