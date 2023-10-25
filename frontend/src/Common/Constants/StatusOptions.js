export const StatusOptions = [
  {
    id: 1,
    name: "منشور",
    value: "published",
    badgeClass: "badge bg-success",
    description: "تمت الموافقة على المنشور ويمكن للجميع مشاهدته.",
    role: "Admin",
  },
  {
    id: 2,
    name: "خاص",
    value: "private",
    badgeClass: "badge bg-success",
    description: "المنشور يمكن مشاهدته فقط بواسطة الإدارة.",
    role: "Admin",
  },
  {
    id: 3,
    name: "في أنتظار الموافقة ",
    value: "pendingApproval",
    badgeClass: "badge bg-warning",
    description: "المنشور مكتمل وفي انتظار الموافقة قبل النشر.",
    role: "Moderator",
  },
  {
    id: 4,
    name: "يفتقد للبيانات",
    value: "missingData",
    badgeClass: "badge bg-danger",
    description: "المنشور غير مكتمل ويفتقد لبيانات أساسية.",
    role: "Moderator",
  },
  {
    id: 5,
    name: "جاري العمل عليه",
    value: "onGoing",
    badgeClass: "badge bg-success",
    description: "يتم العمل حاليًا على المنشور.",
    role: "Admin, Moderator",
  },
  {
    id: 6,
    name: "جديد",
    value: "new",
    badgeClass: "badge bg-success",
    description: "منشور جديد في انتظار مزيد من الإجراءات.",
    role: "Admin, Moderator",
  },
  {
    id: 9,
    name: "محذوف",
    value: "deleted",
    badgeClass: "badge bg-primary",
    description: "المنشور في سلة المحذوفات ولا يمكن مشاهدته للعامة.",
    role: "Admin, Moderator",
  },
];


// switch (status) {
//   case 1:
//     statusName = "Published";
//     badgeClass = "badge-soft-success";
//     break;
//   case 2:
//     statusName = "Private";
//     badgeClass = "badge-soft-secondary";
//     break;
//   case 3:
//     statusName = "Pending Approval";
//     badgeClass = "badge-soft-warning";
//     break;
//   case 4:
//     statusName = "Missing Data";
//     badgeClass = "badge-soft-warning";
//     break;
//   case 5:
//     statusName = "Inprogress";
//     statusName = "Inprogress";
//     break;
//   case 6:
//     statusName = "New";
//     badgeClass = "badge-soft-info";
//     break;
//   case 9:
//     statusName = "Deleted";
//     badgeClass = "badge-soft-secondary";
//     break;
//   default:
//     statusName = "Unknown";
//     badgeClass = "badge-soft-primary";
//     break;
// }