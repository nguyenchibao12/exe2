// Danh sách địa điểm chuẩn để thống nhất search
export const LOCATIONS = [
  { value: '', label: 'Tất cả địa điểm' },
  { value: 'HCM', label: 'Hồ Chí Minh' },
  { value: 'Q1', label: 'Quận 1' },
  { value: 'Q2', label: 'Quận 2' },
  { value: 'Q3', label: 'Quận 3' },
  { value: 'Q4', label: 'Quận 4' },
  { value: 'Q5', label: 'Quận 5' },
  { value: 'Q6', label: 'Quận 6' },
  { value: 'Q7', label: 'Quận 7' },
  { value: 'Q8', label: 'Quận 8' },
  { value: 'Q9', label: 'Quận 9' },
  { value: 'Q10', label: 'Quận 10' },
  { value: 'Q11', label: 'Quận 11' },
  { value: 'Q12', label: 'Quận 12' },
  { value: 'BinhThanh', label: 'Bình Thạnh' },
  { value: 'TanBinh', label: 'Tân Bình' },
  { value: 'TanPhu', label: 'Tân Phú' },
  { value: 'PhuNhuan', label: 'Phú Nhuận' },
  { value: 'GoVap', label: 'Gò Vấp' },
  { value: 'BinhTan', label: 'Bình Tân' },
  { value: 'ThuDuc', label: 'Thủ Đức' },
  { value: 'HocMon', label: 'Hóc Môn' },
  { value: 'CuChi', label: 'Củ Chi' },
  { value: 'NhaBe', label: 'Nhà Bè' },
  { value: 'CanGio', label: 'Cần Giờ' },
  { value: 'HaNoi', label: 'Hà Nội' },
  { value: 'DaNang', label: 'Đà Nẵng' },
  { value: 'Remote', label: 'Remote / Làm việc từ xa' },
  { value: 'Other', label: 'Khác' },
];

// Mapping để tìm kiếm linh hoạt (Q7 = Quận 7, etc.)
export const LOCATION_MAPPING = {
  'Q1': ['Quận 1', 'Q1', 'quận 1', 'quan 1'],
  'Q2': ['Quận 2', 'Q2', 'quận 2', 'quan 2'],
  'Q3': ['Quận 3', 'Q3', 'quận 3', 'quan 3'],
  'Q4': ['Quận 4', 'Q4', 'quận 4', 'quan 4'],
  'Q5': ['Quận 5', 'Q5', 'quận 5', 'quan 5'],
  'Q6': ['Quận 6', 'Q6', 'quận 6', 'quan 6'],
  'Q7': ['Quận 7', 'Q7', 'quận 7', 'quan 7'],
  'Q8': ['Quận 8', 'Q8', 'quận 8', 'quan 8'],
  'Q9': ['Quận 9', 'Q9', 'quận 9', 'quan 9'],
  'Q10': ['Quận 10', 'Q10', 'quận 10', 'quan 10'],
  'Q11': ['Quận 11', 'Q11', 'quận 11', 'quan 11'],
  'Q12': ['Quận 12', 'Q12', 'quận 12', 'quan 12'],
  'HCM': ['Hồ Chí Minh', 'HCM', 'TP.HCM', 'TP HCM', 'Sài Gòn', 'Sai Gon', 'Ho Chi Minh'],
  'Remote': ['Remote', 'Từ xa', 'Làm việc từ xa', 'Work from home', 'WFH'],
  'HaNoi': ['Hà Nội', 'Ha Noi', 'Hanoi'],
  'DaNang': ['Đà Nẵng', 'Da Nang', 'Danang'],
};

// Hàm normalize location để tìm kiếm
export const normalizeLocation = (location) => {
  if (!location) return '';
  const normalized = location.trim();
  
  // Tìm trong mapping
  for (const [key, variants] of Object.entries(LOCATION_MAPPING)) {
    if (variants.some(v => normalized.toLowerCase() === v.toLowerCase())) {
      return key;
    }
  }
  
  return normalized;
};

