import { FloorLevel } from '../types/game';

export const TUTORIAL_LEVEL: FloorLevel = {
  id: 0,
  title: 'HƯỚNG DẪN TÂN BINH: NGÀY ĐẦU ĐI LÀM',
  subtitle: 'Thực hành 4 kỹ năng sống còn: Di chuyển, Rón rén, Ẩn nấp & Đánh lạc hướng!',
  deptName: 'Phòng Tập Huấn Công Sở 101',
  mapWidth: 850,
  mapHeight: 560,
  playerStart: { x: 70, y: 120 },
  exitPoint: { x: 730, y: 430, width: 60, height: 75, requiredItemType: 'card' },
  isTutorial: true,
  timeLimit: 120, // 2 minutes for learning
  dialogueIntro: [
    'Chào mừng thực tập sinh mới! Bí kíp số 1 để tồn tại ở công sở: "Tan ca đúng giờ"!',
    '1. Dùng Cần gạt hoặc WASD để di chuyển tới bàn làm việc.',
    '2. Bấm [Rón Rén] khi đi qua sếp đang lơ đễnh.',
    '3. Đến Thùng Giấy và bấm [Nấp] để chui vào.',
    '4. Bấm [Ném Cốc] dụ sếp ra xa, lấy Thẻ Chấm Công và thoát ra ngoài!'
  ],
  dialogueCaught: [
    'Sếp Huấn Luyện: "Bị phát hiện rồi em ơi! Nhớ chui vào Thùng [Nấp] hoặc Rón Rén nhé!"',
    'Thử lại một lần nữa nào!'
  ],
  walls: [
    { x: 0, y: 0, width: 850, height: 25, type: 'wall' },
    { x: 0, y: 535, width: 850, height: 25, type: 'wall' },
    { x: 0, y: 0, width: 25, height: 560, type: 'wall' },
    { x: 825, y: 0, width: 25, height: 560, type: 'wall' },

    // Training partition 1
    { x: 240, y: 25, width: 20, height: 280, type: 'wall' },
    { x: 240, y: 380, width: 20, height: 160, type: 'wall' },

    // Training partition 2
    { x: 520, y: 120, width: 20, height: 420, type: 'wall' },

    // Desks
    { x: 60, y: 240, width: 140, height: 40, type: 'cubicle', label: 'Bàn Tập Huấn 1' },
    { x: 320, y: 200, width: 150, height: 40, type: 'cubicle', label: 'Bàn Tập Huấn 2' },
    { x: 600, y: 160, width: 160, height: 40, type: 'cubicle', label: 'Bàn Lấy Thẻ' }
  ],
  hidingSpots: [
    { id: 'tut_box_1', type: 'box', x: 380, y: 100, width: 50, height: 50, isOccupied: false },
    { id: 'tut_plant_1', type: 'plant', x: 640, y: 60, width: 45, height: 50, isOccupied: false },
    { id: 'tut_box_2', type: 'box', x: 620, y: 320, width: 50, height: 50, isOccupied: false }
  ],
  bosses: [
    {
      id: 'boss_mentor',
      name: 'Anh Mentor Thử Việc',
      role: 'Sếp Tập Luyện (Đi chậm, tầm nhìn hẹp)',
      x: 620,
      y: 220,
      width: 44,
      height: 44,
      speed: 1.2,
      facingAngle: Math.PI / 2,
      state: 'patrol',
      patrolPoints: [
        { x: 620, y: 120 },
        { x: 620, y: 220 },
        { x: 620, y: 360 },
        { x: 380, y: 360 },
        { x: 380, y: 120 },
        { x: 180, y: 360 }
      ],
      currentPointIndex: 0,
      investigateTimer: 0,
      fieldOfView: Math.PI * 0.35,
      visionDistance: 160,
      alertLevel: 0,
      skin: 'boss_male'
    }
  ],
  cameras: [],
  collectibles: [
    { id: 'tut_card', type: 'card', name: 'Thẻ Chấm Công Tập Sự', x: 740, y: 110, isCollected: false, requiredForExit: true },
    { id: 'tut_paper', type: 'paper_distraction', name: 'Cốc Tập Ném [Q]', x: 320, y: 360, isCollected: false },
    { id: 'tut_cash', type: 'bonus_cash', name: 'Tiền Thưởng Thử Việc', x: 120, y: 420, isCollected: false, value: 100 }
  ]
};

export const STORY_LEVELS: FloorLevel[] = [
  // ẢI 1: BẢN ĐỒ VĂN PHÒNG TỔNG 1600X896 (FULL COLLISION MATCHING BACKGROUND MAP)
  {
    id: 1,
    title: 'ẢI 1: VĂN PHÒNG TỔNG TẦNG 1600X896',
    subtitle: 'Nhiệm vụ: Lấy Thẻ Chấm Công VIP & Ba Lô, né Sếp để thoát Cửa EXIT góc phải!',
    deptName: 'Khu Văn Phòng Tổng Hợp VIP (1600x896 Pixel)',
    mapWidth: 1600,
    mapHeight: 896,
    playerStart: { x: 380, y: 760 },
    exitPoint: { x: 1450, y: 60, width: 90, height: 70, requiredItemType: 'card' },
    timeLimit: 90,
    dialogueIntro: [
      'Đúng 17:30! Văn phòng tổng 1600x896 đã hết giờ làm việc!',
      'LƯU Ý: Tất cả bàn ghế, tủ server và tường đều là vật thể cứng không thể đi xuyên!',
      'Hãy di chuyển theo đúng hành lang trống, lấy Thẻ Chấm Công VIP và thoát ra Cửa EXIT góc phải!'
    ],
    dialogueCaught: [
      'Sếp Tổng: "Chạy đi đâu đấy em? Còn 20 bản báo cáo KPI chưa nộp mà đã định về à?"',
      'Bạn bị bắt làm OT xuyên đêm đến 22:00...'
    ],
    walls: [
      // 1. SURROUNDING OUTER BOUNDARY WALLS (Tường bao quanh toàn bộ 1600x896)
      { x: 0, y: 0, width: 1600, height: 60, type: 'wall' },        // Top outer wall
      { x: 0, y: 836, width: 1600, height: 60, type: 'wall' },      // Bottom outer wall
      { x: 0, y: 0, width: 60, height: 896, type: 'wall' },        // Left outer wall
      { x: 1540, y: 0, width: 60, height: 896, type: 'wall' },      // Right outer wall

      // 2. IT & SERVER ROOM (Top-Left)
      { x: 80, y: 60, width: 260, height: 80, type: 'server', label: 'Tủ Server IT' },
      { x: 80, y: 180, width: 140, height: 60, type: 'water_cooler', label: 'Bình Nước IT' },
      { x: 410, y: 60, width: 24, height: 280, type: 'wall' },      // IT Partition wall

      // 3. QA & TESTING CUBICLES (Mid-Left & Center-Left)
      { x: 80, y: 280, width: 260, height: 90, type: 'cubicle', label: 'Bàn QA 1' },
      { x: 80, y: 420, width: 260, height: 90, type: 'cubicle', label: 'Bàn QA 2' },
      { x: 80, y: 560, width: 260, height: 90, type: 'cubicle', label: 'Bàn QA 3' },

      // 4. RECEPTION & LOBBY (Bottom-Left)
      { x: 80, y: 700, width: 280, height: 100, type: 'cubicle', label: 'Quầy Lễ Tân' },

      // 5. DEVELOPER & ENGINEERING DEPARTMENT (Center-Left)
      { x: 420, y: 120, width: 24, height: 600, type: 'wall' },     // Dev Divider Partition
      { x: 480, y: 160, width: 280, height: 90, type: 'cubicle', label: 'Bàn Frontend' },
      { x: 480, y: 300, width: 280, height: 90, type: 'cubicle', label: 'Bàn Backend' },
      { x: 480, y: 440, width: 280, height: 90, type: 'cubicle', label: 'Bàn Fullstack' },
      { x: 480, y: 580, width: 280, height: 90, type: 'cubicle', label: 'Bàn Mobile' },
      { x: 480, y: 710, width: 280, height: 90, type: 'cubicle', label: 'Bàn DevOps' },

      // 6. HR & MARKETING DEPARTMENT (Center-Right)
      { x: 820, y: 120, width: 24, height: 600, type: 'wall' },     // HR Divider Partition
      { x: 880, y: 160, width: 260, height: 90, type: 'cubicle', label: 'Bàn HR' },
      { x: 880, y: 300, width: 260, height: 90, type: 'cubicle', label: 'Bàn Marketing' },
      { x: 880, y: 440, width: 260, height: 90, type: 'cubicle', label: 'Bàn UI/UX' },
      { x: 880, y: 580, width: 260, height: 90, type: 'cubicle', label: 'Bàn Sales' },
      { x: 880, y: 710, width: 260, height: 90, type: 'cubicle', label: 'Sofa Lounge' },

      // 7. EXECUTIVE DEPARTMENT & BOARDROOM (Top-Right)
      { x: 1180, y: 60, width: 24, height: 660, type: 'wall' },    // Executive Glass Divider
      { x: 1240, y: 140, width: 260, height: 90, type: 'cubicle', label: 'Bàn Giám Đốc' },
      { x: 1240, y: 320, width: 260, height: 110, type: 'cubicle', label: 'Bàn Họp Giám Đốc' },
      { x: 1240, y: 500, width: 260, height: 90, type: 'wall', label: 'Sofa Giám Đốc' },

      // 8. EXIT HALLWAY & SECURITY BARRIER (Far Right)
      { x: 1420, y: 140, width: 24, height: 680, type: 'wall' },    // Security Partition
      { x: 1440, y: 140, width: 100, height: 40, type: 'door_locked', label: 'Cổng An Ninh' }
    ],
    hidingSpots: [
      { id: 'm1600_box1', type: 'box', x: 350, y: 180, width: 48, height: 48, isOccupied: false },
      { id: 'm1600_box2', type: 'box', x: 350, y: 380, width: 48, height: 48, isOccupied: false },
      { id: 'm1600_box3', type: 'box', x: 780, y: 260, width: 48, height: 48, isOccupied: false },
      { id: 'm1600_box4', type: 'box', x: 1140, y: 260, width: 48, height: 48, isOccupied: false },
      { id: 'm1600_box5', type: 'box', x: 1380, y: 260, width: 48, height: 48, isOccupied: false },

      { id: 'm1600_plant1', type: 'plant', x: 350, y: 100, width: 40, height: 48, isOccupied: false },
      { id: 'm1600_plant2', type: 'plant', x: 380, y: 780, width: 40, height: 48, isOccupied: false },
      { id: 'm1600_plant3', type: 'plant', x: 780, y: 780, width: 40, height: 48, isOccupied: false },
      { id: 'm1600_plant4', type: 'plant', x: 1150, y: 780, width: 40, height: 48, isOccupied: false },
      { id: 'm1600_plant5', type: 'plant', x: 1380, y: 80, width: 40, height: 48, isOccupied: false }
    ],
    bosses: [
      {
        id: 'boss_it_tuan',
        name: 'Sếp IT Tuấn Bug',
        role: 'Quản Lý Mạng IT Văn Phòng',
        x: 380,
        y: 120,
        width: 44,
        height: 44,
        speed: 1.8,
        facingAngle: 0,
        state: 'patrol',
        patrolPoints: [
          { x: 380, y: 120 },
          { x: 380, y: 780 },
          { x: 790, y: 780 },
          { x: 790, y: 120 },
          { x: 1150, y: 120 },
          { x: 1150, y: 780 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.45,
        visionDistance: 210,
        alertLevel: 0,
        skin: 'boss_male'
      },
      {
        id: 'boss_ceo_hoang',
        name: 'Sếp Tổng Hoàng VIP',
        role: 'Tổng Giám Đốc Điều Hành',
        x: 1210,
        y: 120,
        width: 44,
        height: 44,
        speed: 2.0,
        facingAngle: Math.PI / 2,
        state: 'patrol',
        patrolPoints: [
          { x: 1210, y: 120 },
          { x: 1210, y: 780 },
          { x: 1390, y: 780 },
          { x: 1390, y: 120 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.45,
        visionDistance: 220,
        alertLevel: 0,
        skin: 'boss_female'
      }
    ],
    cameras: [
      {
        id: 'cam_exec',
        x: 1180,
        y: 80,
        baseAngle: Math.PI / 4,
        sweepAngle: Math.PI / 2,
        currentAngle: Math.PI / 4,
        rotationSpeed: 0.015,
        sweepDir: 1,
        visionDistance: 200,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      }
    ],
    collectibles: [
      { id: 'm1600_card', type: 'card', name: 'Thẻ Chấm Công VIP Giám Đốc', x: 1370, y: 180, isCollected: false, requiredForExit: true },
      { id: 'm1600_bag', type: 'backpack', name: 'Ba Lô Laptop Chống Nước', x: 200, y: 120, isCollected: false, requiredForExit: true },
      { id: 'm1600_boba', type: 'boba', name: 'Trà Sữa Hoàng Gia', x: 790, y: 220, isCollected: false, value: 50 },
      { id: 'm1600_cash1', type: 'bonus_cash', name: 'Tiền Thưởng KPI Tầng 1600', x: 1150, y: 460, isCollected: false, value: 100 },
      { id: 'm1600_paper1', type: 'paper_distraction', name: 'Cốc Giấy Đánh Lạc Hướng', x: 370, y: 400, isCollected: false }
    ]
  },

  // ẢI 2: TẦNG 4 - PHÒNG DEV & IT
  {
    id: 2,
    title: 'ẢI 2: TẦNG 4 - PHÒNG DEV & IT',
    subtitle: 'Nhiệm vụ: Lấy Chìa Khóa Xe Máy ở góc phòng máy chủ & phi ra cầu thang!',
    deptName: 'Phòng Phát Triển Phần Mềm',
    mapWidth: 1000,
    mapHeight: 700,
    playerStart: { x: 80, y: 100 },
    exitPoint: { x: 920, y: 580, width: 60, height: 80, requiredItemType: 'key' },
    timeLimit: 65, // 65 seconds
    dialogueIntro: [
      'Tầng 4 Dev! Sếp Tuấn IT đang lượn lờ: "Ai rảnh hotfix hộ con API này nhé!"',
      'Chìa khóa xe máy để ở góc thoáng phòng máy chủ. Nhặt nhanh rồi chuồn!'
    ],
    dialogueCaught: [
      'Sếp Tuấn IT: "Á à! Định chuồn hả em? Vào đây test lại API 200 endpoint này đã!"',
      'Bạn bị ép OT đến 23:00 và ăn mì tôm úp lạnh ngắt...'
    ],
    walls: [
      { x: 0, y: 0, width: 1000, height: 30, type: 'wall' },
      { x: 0, y: 670, width: 1000, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 700, type: 'wall' },
      { x: 970, y: 0, width: 30, height: 700, type: 'wall' },

      { x: 60, y: 200, width: 220, height: 40, type: 'cubicle', label: 'Bàn Dev 1' },
      { x: 60, y: 320, width: 220, height: 40, type: 'cubicle', label: 'Bàn Dev 2' },

      { x: 400, y: 120, width: 240, height: 45, type: 'cubicle', label: 'Cụm QA/Tester' },
      { x: 400, y: 260, width: 240, height: 45, type: 'cubicle', label: 'Cụm Frontend' },
      { x: 400, y: 400, width: 240, height: 45, type: 'cubicle', label: 'Cụm Backend' },

      { x: 740, y: 30, width: 20, height: 260, type: 'wall' },
      { x: 740, y: 290, width: 150, height: 20, type: 'wall' },
      { x: 800, y: 80, width: 140, height: 50, type: 'server', label: 'Tủ Rack Server' },
      { x: 800, y: 170, width: 140, height: 50, type: 'server', label: 'Máy Chủ Dữ Liệu' },

      { x: 60, y: 460, width: 180, height: 20, type: 'wall' },
      { x: 230, y: 460, width: 20, height: 160, type: 'wall' },
      { x: 80, y: 500, width: 45, height: 45, type: 'water_cooler', label: 'Bình Nước' },

      { x: 740, y: 420, width: 230, height: 20, type: 'wall' },
      { x: 740, y: 420, width: 20, height: 110, type: 'wall' }
    ],
    hidingSpots: [
      { id: 'box_1', type: 'box', x: 220, y: 100, width: 50, height: 50, isOccupied: false },
      { id: 'desk_1', type: 'desk', x: 140, y: 250, width: 60, height: 40, isOccupied: false },
      { id: 'box_2', type: 'box', x: 330, y: 340, width: 50, height: 50, isOccupied: false },
      { id: 'plant_1', type: 'plant', x: 700, y: 60, width: 40, height: 50, isOccupied: false },
      { id: 'box_3', type: 'box', x: 680, y: 480, width: 50, height: 50, isOccupied: false },
      { id: 'plant_2', type: 'plant', x: 690, y: 600, width: 45, height: 50, isOccupied: false }
    ],
    bosses: [
      {
        id: 'boss_tuan',
        name: 'Sếp Tuấn Bug',
        role: 'Trưởng phòng IT cuồng OT',
        x: 480,
        y: 190,
        width: 44,
        height: 44,
        speed: 1.8,
        facingAngle: 0,
        state: 'patrol',
        patrolPoints: [
          { x: 180, y: 120 },
          { x: 350, y: 120 },
          { x: 350, y: 260 },
          { x: 680, y: 190 },
          { x: 680, y: 340 },
          { x: 350, y: 480 },
          { x: 680, y: 480 },
          { x: 880, y: 320 },
          { x: 880, y: 560 },
          { x: 520, y: 560 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.45,
        visionDistance: 210,
        alertLevel: 0,
        skin: 'boss_male'
      }
    ],
    cameras: [],
    collectibles: [
      { id: 'key_1', type: 'key', name: 'Chìa Khóa Xe Máy', x: 880, y: 350, isCollected: false, requiredForExit: true },
      { id: 'coffee_1', type: 'coffee', name: 'Cà Phê Muối (Tăng tốc)', x: 180, y: 560, isCollected: false },
      { id: 'boba_1', type: 'boba', name: 'Trà Sữa Trân Châu 70% Đường', x: 350, y: 560, isCollected: false, value: 40 },
      { id: 'cash_1', type: 'bonus_cash', name: 'Phong Bì Dự Án', x: 680, y: 80, isCollected: false, value: 50 },
      { id: 'paper_1', type: 'paper_distraction', name: 'Cốc Giấy Ném Lạc Hướng', x: 330, y: 80, isCollected: false },
      { id: 'paper_2', type: 'paper_distraction', name: 'Vỏ Lon Ném Lạc Hướng', x: 520, y: 560, isCollected: false }
    ]
  },

  // ẢI 3: TẦNG 3 - MARKETING & TRUYỀN THÔNG
  {
    id: 3,
    title: 'ẢI 3: TẦNG 3 - MARKETING & TRUYỀN THÔNG',
    subtitle: 'Nhiệm vụ: Lấy Thẻ Chấm Công ở máy in, né Trưởng Phòng & HR mách lẻo!',
    deptName: 'Phòng Marketing & Sáng Tạo',
    mapWidth: 1050,
    mapHeight: 720,
    playerStart: { x: 70, y: 620 },
    exitPoint: { x: 940, y: 80, width: 60, height: 75, requiredItemType: 'card' },
    timeLimit: 60, // 60 seconds
    dialogueIntro: [
      'Chị Hạnh Marketing và em Linh HR đang canh cửa thang máy.',
      'Thẻ chấm công để ở máy in góc trên. Trốn trong hộp hoặc chậu cây khi họ đi qua!'
    ],
    dialogueCaught: [
      'Chị Hạnh MKT: "Em ơi! Trend TikTok mới bùng nổ rồi, tối nay ở lại brainstorm 100 kịch bản nhé!"',
      'Bạn bị bắt ngồi viết content đến sáng hôm sau...'
    ],
    walls: [
      { x: 0, y: 0, width: 1050, height: 30, type: 'wall' },
      { x: 0, y: 690, width: 1050, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 720, type: 'wall' },
      { x: 1020, y: 0, width: 30, height: 720, type: 'wall' },

      { x: 340, y: 30, width: 20, height: 260, type: 'wall' },
      { x: 340, y: 270, width: 280, height: 20, type: 'wall' },
      { x: 600, y: 30, width: 20, height: 180, type: 'wall' },

      { x: 100, y: 160, width: 180, height: 50, type: 'cubicle', label: 'Bàn Thiết Kế' },
      { x: 100, y: 340, width: 180, height: 50, type: 'cubicle', label: 'Bàn Content' },
      { x: 100, y: 480, width: 180, height: 50, type: 'cubicle', label: 'Bàn Media' },

      { x: 740, y: 30, width: 20, height: 110, type: 'wall' },
      { x: 740, y: 230, width: 280, height: 20, type: 'wall' },
      { x: 820, y: 90, width: 80, height: 70, type: 'printer', label: 'Máy In Photocopy' },

      { x: 420, y: 420, width: 260, height: 45, type: 'cubicle', label: 'Bàn Họp Nhóm' },
      { x: 760, y: 420, width: 200, height: 45, type: 'cubicle', label: 'Ghế Sofa Chill' },
      { x: 700, y: 560, width: 25, height: 130, type: 'wall' }
    ],
    hidingSpots: [
      { id: 'plant_2a', type: 'plant', x: 290, y: 150, width: 45, height: 50, isOccupied: false },
      { id: 'box_2a', type: 'box', x: 220, y: 260, width: 50, height: 50, isOccupied: false },
      { id: 'desk_2a', type: 'desk', x: 440, y: 160, width: 80, height: 45, isOccupied: false },
      { id: 'box_2b', type: 'box', x: 670, y: 160, width: 50, height: 50, isOccupied: false },
      { id: 'plant_2b', type: 'plant', x: 380, y: 370, width: 40, height: 50, isOccupied: false },
      { id: 'box_2c', type: 'box', x: 650, y: 500, width: 50, height: 50, isOccupied: false },
      { id: 'plant_2c', type: 'plant', x: 740, y: 620, width: 45, height: 50, isOccupied: false }
    ],
    bosses: [
      {
        id: 'boss_hanh',
        name: 'Chị Hạnh MKT',
        role: 'Trưởng Phòng Content & KPI',
        x: 460,
        y: 110,
        width: 44,
        height: 44,
        speed: 1.9,
        facingAngle: 0,
        state: 'patrol',
        patrolPoints: [
          { x: 180, y: 100 },
          { x: 450, y: 100 },
          { x: 550, y: 220 },
          { x: 480, y: 350 },
          { x: 220, y: 280 },
          { x: 220, y: 520 },
          { x: 680, y: 350 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.45,
        visionDistance: 220,
        alertLevel: 0,
        skin: 'boss_female'
      },
      {
        id: 'hr_linh',
        name: 'Em Linh HR',
        role: 'Chuyên viên Nhân sự thám tử',
        x: 820,
        y: 490,
        width: 42,
        height: 42,
        speed: 1.6,
        facingAngle: Math.PI,
        state: 'patrol',
        patrolPoints: [
          { x: 820, y: 490 },
          { x: 450, y: 490 },
          { x: 450, y: 620 },
          { x: 850, y: 620 },
          { x: 850, y: 300 },
          { x: 680, y: 120 },
          { x: 930, y: 120 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.4,
        visionDistance: 190,
        alertLevel: 0,
        skin: 'hr_snitch'
      }
    ],
    cameras: [],
    collectibles: [
      { id: 'card_1', type: 'card', name: 'Thẻ Chấm Công VIP', x: 930, y: 140, isCollected: false, requiredForExit: true },
      { id: 'coffee_2', type: 'coffee', name: 'Matcha Đá Xay', x: 120, y: 80, isCollected: false },
      { id: 'cash_3', type: 'bonus_cash', name: 'Phong Bì Thưởng Chiến Dịch', x: 500, y: 360, isCollected: false, value: 50 },
      { id: 'boba_3', type: 'boba', name: 'Trà Sữa Khoai Môn', x: 820, y: 360, isCollected: false, value: 40 },
      { id: 'paper_2a', type: 'paper_distraction', name: 'Tập Kế Hoạch Bỏ Đi', x: 260, y: 440, isCollected: false },
      { id: 'paper_2b', type: 'paper_distraction', name: 'Ly Trà Sữa Đã Uống', x: 740, y: 340, isCollected: false }
    ]
  },

  // ẢI 4: TẦNG 2 - PHÒNG KẾ TOÁN & TÀI CHÍNH
  {
    id: 4,
    title: 'ẢI 4: TẦNG 2 - KẾ TOÁN & TÀI CHÍNH',
    subtitle: 'Nhiệm vụ: Né Camera Quét Laser & Lấy Chìa Khóa Thang Máy VIP!',
    deptName: 'Khu Vực Ban Điều Hành & Tài Chính',
    mapWidth: 1100,
    mapHeight: 740,
    playerStart: { x: 70, y: 80 },
    exitPoint: { x: 980, y: 630, width: 60, height: 75, requiredItemType: 'key' },
    timeLimit: 55, // 55 seconds
    dialogueIntro: [
      'Tầng 2 được gắn Camera xoay quét laser đỏ cực kỳ nhạy!',
      'Sếp Kế toán đang rà soát chứng từ. Nhanh tay lấy Chìa Khóa VIP trong két sắt!'
    ],
    dialogueCaught: [
      'Sếp Kế Toán: "Cậu kia! Báo cáo tài chính quý này sai 1 đồng, ở lại rà soát hết 2.000 trang Excel!"',
      'Đêm nay bạn làm bạn cùng những con số đến phát khóc...'
    ],
    walls: [
      { x: 0, y: 0, width: 1100, height: 30, type: 'wall' },
      { x: 0, y: 710, width: 1100, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 740, type: 'wall' },
      { x: 1070, y: 0, width: 30, height: 740, type: 'wall' },

      { x: 380, y: 160, width: 340, height: 25, type: 'wall' },
      { x: 380, y: 160, width: 25, height: 240, type: 'wall' },
      { x: 700, y: 160, width: 25, height: 240, type: 'wall' },
      { x: 380, y: 400, width: 120, height: 25, type: 'wall' },
      { x: 600, y: 400, width: 125, height: 25, type: 'wall' },
      { x: 480, y: 220, width: 140, height: 60, type: 'cubicle', label: 'Bàn Làm Việc Kế Toán Trưởng' },

      { x: 30, y: 450, width: 280, height: 25, type: 'wall' },
      { x: 285, y: 450, width: 25, height: 260, type: 'wall' },
      { x: 80, y: 520, width: 150, height: 45, type: 'cubicle', label: 'Bàn Thủ Quỹ' },

      { x: 220, y: 30, width: 25, height: 180, type: 'wall' },
      { x: 800, y: 30, width: 25, height: 220, type: 'wall' },

      { x: 800, y: 380, width: 270, height: 25, type: 'wall' },
      { x: 800, y: 380, width: 25, height: 180, type: 'wall' }
    ],
    hidingSpots: [
      { id: 'box_3a', type: 'box', x: 140, y: 140, width: 50, height: 50, isOccupied: false },
      { id: 'plant_3a', type: 'plant', x: 320, y: 100, width: 45, height: 50, isOccupied: false },
      { id: 'plant_3b', type: 'plant', x: 740, y: 100, width: 45, height: 50, isOccupied: false },
      { id: 'desk_3a', type: 'desk', x: 120, y: 300, width: 70, height: 45, isOccupied: false },
      { id: 'box_3b', type: 'box', x: 350, y: 500, width: 50, height: 50, isOccupied: false },
      { id: 'plant_3c', type: 'plant', x: 740, y: 310, width: 45, height: 50, isOccupied: false },
      { id: 'box_3c', type: 'box', x: 740, y: 580, width: 50, height: 50, isOccupied: false }
    ],
    bosses: [
      {
        id: 'boss_ke_toan',
        name: 'Chị Mai Kế Toán',
        role: 'Nữ Thần Kiểm Kê Số Sách',
        x: 550,
        y: 290,
        width: 46,
        height: 46,
        speed: 2.0,
        facingAngle: Math.PI / 2,
        state: 'patrol',
        patrolPoints: [
          { x: 200, y: 100 },
          { x: 550, y: 100 },
          { x: 550, y: 300 },
          { x: 200, y: 320 },
          { x: 550, y: 520 },
          { x: 880, y: 320 },
          { x: 880, y: 580 },
          { x: 550, y: 620 },
          { x: 200, y: 620 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.45,
        visionDistance: 230,
        alertLevel: 0,
        skin: 'boss_female'
      }
    ],
    cameras: [
      {
        id: 'cam_1',
        x: 40,
        y: 40,
        baseAngle: Math.PI * 0.25,
        sweepAngle: Math.PI * 0.4,
        currentAngle: Math.PI * 0.25,
        rotationSpeed: 0.018,
        sweepDir: 1,
        visionDistance: 210,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      },
      {
        id: 'cam_2',
        x: 1040,
        y: 40,
        baseAngle: Math.PI * 0.75,
        sweepAngle: Math.PI * 0.45,
        currentAngle: Math.PI * 0.75,
        rotationSpeed: 0.02,
        sweepDir: 1,
        visionDistance: 220,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      }
    ],
    collectibles: [
      { id: 'key_3', type: 'key', name: 'Chìa Khóa Thang Máy VIP', x: 140, y: 620, isCollected: false, requiredForExit: true },
      { id: 'coffee_3', type: 'coffee', name: 'RedBull Tăng Lực', x: 950, y: 160, isCollected: false },
      { id: 'cash_4', type: 'bonus_cash', name: 'Khoản Thưởng Qúy IV', x: 920, y: 440, isCollected: false, value: 60 },
      { id: 'boba_4', type: 'boba', name: 'Trà Sữa Ô Long', x: 420, y: 100, isCollected: false, value: 40 },
      { id: 'paper_3a', type: 'paper_distraction', name: 'Cục Tẩy Ném Lạc Hướng', x: 260, y: 120, isCollected: false },
      { id: 'paper_3b', type: 'paper_distraction', name: 'Tài Liệu Hủy Vo Tròn', x: 540, y: 640, isCollected: false }
    ]
  },

  // ẢI 5: TẦNG 1.5 - KHU BAN GIÁM ĐỐC VIP
  {
    id: 5,
    title: 'ẢI 5: TẦNG 1.5 - KHU BAN GIÁM ĐỐC VIP',
    subtitle: 'Nhiệm vụ: Né Phó TGĐ Hùng & Camera 360 để lấy Thẻ Thang Máy!',
    deptName: 'Khu Vực Ban Điều Hành VIP',
    mapWidth: 1150,
    mapHeight: 740,
    playerStart: { x: 70, y: 90 },
    exitPoint: { x: 1040, y: 350, width: 60, height: 75, requiredItemType: 'card' },
    timeLimit: 50, // 50 seconds
    dialogueIntro: [
      'Phó TGĐ Hùng đang tuần tra khu vực VIP cùng hệ thống 3 Camera an ninh.',
      'Sếp nghe tiếng chân cực thính! Dùng [Rón Rén] và nấp vào thùng giấy ngụy trang!'
    ],
    dialogueCaught: [
      'Phó TGĐ Hùng: "Đứng lại! Slide chiến lược năm sau chưa trình bày mà đòi chuồn hả?!"',
      'Bạn bị giữ lại thuyết trình đến nửa đêm...'
    ],
    walls: [
      { x: 0, y: 0, width: 1150, height: 30, type: 'wall' },
      { x: 0, y: 710, width: 1150, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 740, type: 'wall' },
      { x: 1120, y: 0, width: 30, height: 740, type: 'wall' },

      { x: 260, y: 30, width: 25, height: 260, type: 'wall' },
      { x: 260, y: 440, width: 25, height: 270, type: 'wall' },

      { x: 500, y: 200, width: 300, height: 45, type: 'cubicle', label: 'Bàn Họp Hội Đồng' },
      { x: 500, y: 400, width: 300, height: 45, type: 'cubicle', label: 'Bàn Ký Hợp Đồng' },

      { x: 880, y: 30, width: 25, height: 220, type: 'wall' },
      { x: 880, y: 480, width: 25, height: 230, type: 'wall' }
    ],
    hidingSpots: [
      { id: 'f5_box_a', type: 'box', x: 120, y: 220, width: 50, height: 50, isOccupied: false },
      { id: 'f5_plant_a', type: 'plant', x: 380, y: 100, width: 45, height: 50, isOccupied: false },
      { id: 'f5_box_b', type: 'box', x: 620, y: 100, width: 50, height: 50, isOccupied: false },
      { id: 'f5_plant_b', type: 'plant', x: 420, y: 550, width: 45, height: 50, isOccupied: false },
      { id: 'f5_box_c', type: 'box', x: 740, y: 550, width: 50, height: 50, isOccupied: false }
    ],
    bosses: [
      {
        id: 'boss_hung_ptgd',
        name: 'Sếp Hùng Phó TGĐ',
        role: 'Cỗ Máy Ép Tiến Độ',
        x: 600,
        y: 300,
        width: 48,
        height: 48,
        speed: 2.1,
        facingAngle: 0,
        state: 'patrol',
        patrolPoints: [
          { x: 140, y: 100 },
          { x: 400, y: 100 },
          { x: 400, y: 300 },
          { x: 820, y: 300 },
          { x: 820, y: 520 },
          { x: 400, y: 520 },
          { x: 140, y: 520 },
          { x: 960, y: 120 },
          { x: 960, y: 580 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.46,
        visionDistance: 240,
        alertLevel: 0,
        skin: 'boss_male'
      }
    ],
    cameras: [
      {
        id: 'cam_f5_1',
        x: 40,
        y: 40,
        baseAngle: Math.PI * 0.25,
        sweepAngle: Math.PI * 0.4,
        currentAngle: Math.PI * 0.25,
        rotationSpeed: 0.02,
        sweepDir: 1,
        visionDistance: 220,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      },
      {
        id: 'cam_f5_2',
        x: 870,
        y: 40,
        baseAngle: Math.PI * 0.6,
        sweepAngle: Math.PI * 0.4,
        currentAngle: Math.PI * 0.6,
        rotationSpeed: 0.022,
        sweepDir: 1,
        visionDistance: 230,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      },
      {
        id: 'cam_f5_3',
        x: 870,
        y: 700,
        baseAngle: -Math.PI * 0.6,
        sweepAngle: Math.PI * 0.4,
        currentAngle: -Math.PI * 0.6,
        rotationSpeed: 0.022,
        sweepDir: 1,
        visionDistance: 230,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      }
    ],
    collectibles: [
      { id: 'card_f5', type: 'card', name: 'Thẻ Từ Thang Máy VIP', x: 620, y: 500, isCollected: false, requiredForExit: true },
      { id: 'coffee_f5', type: 'coffee', name: 'Espresso Đậm Đặc', x: 140, y: 400, isCollected: false },
      { id: 'cash_f5', type: 'bonus_cash', name: 'Phong Bì Cổ Tức VIP', x: 960, y: 120, isCollected: false, value: 70 },
      { id: 'boba_f5', type: 'boba', name: 'Trà Sữa Trân Châu Hoàng Gia', x: 960, y: 580, isCollected: false, value: 50 },
      { id: 'paper_f5', type: 'paper_distraction', name: 'Cốc Thủy Tinh Giả', x: 420, y: 120, isCollected: false }
    ]
  },

  // ẢI 6: TẦNG 1 - ĐẠI SẢNH THOÁT HIỂM (CHUNG KẾT)
  {
    id: 6,
    title: 'ẢI 6: TẦNG 1 - ĐẠI SẢNH THOÁT HIỂM',
    subtitle: 'Nhiệm vụ cuối: Lấy Thẻ Mở Cửa Cuốn, né Sếp Tổng & Bác Bảo Vệ để VỀ NHÀ!',
    deptName: 'Sảnh Lễ Tân & Cổng Chính Tòa Nhà',
    mapWidth: 1200,
    mapHeight: 760,
    playerStart: { x: 80, y: 120 },
    exitPoint: { x: 1080, y: 350, width: 70, height: 90, requiredItemType: 'card' },
    timeLimit: 45, // 45 seconds intense sprint
    dialogueIntro: [
      'Đây là tầng trệt! Cánh cửa tự do đang ở ngay trước mắt bạn!',
      'Sếp Tổng đích thân phục kích ở khu vực Lễ tân để chặn bất cứ ai về trước 19:00!',
      'Bác bảo vệ đang gác cổng an ninh. Nhanh tay lấy Thẻ Cửa Cuốn rồi VỌT RA NGOÀI NGAY!'
    ],
    dialogueCaught: [
      'Sếp Tổng: "Haha! Bắt được chú em rồi nhé! Cả công ty chưa ai về, ai cho chú về hả?!"',
      'Bạn bị giữ lại làm lễ tân xuyên đêm...'
    ],
    walls: [
      { x: 0, y: 0, width: 1200, height: 30, type: 'wall' },
      { x: 0, y: 730, width: 1200, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 760, type: 'wall' },
      { x: 1170, y: 0, width: 30, height: 760, type: 'wall' },

      { x: 30, y: 220, width: 100, height: 25, type: 'wall' },
      { x: 225, y: 30, width: 25, height: 200, type: 'wall' },

      { x: 480, y: 260, width: 240, height: 70, type: 'cubicle', label: 'Quầy Lễ Tân Đại Sảnh' },

      { x: 920, y: 30, width: 25, height: 270, type: 'wall', label: 'Hàng Rào An Ninh' },
      { x: 920, y: 450, width: 25, height: 280, type: 'wall', label: 'Hàng Rào An Ninh' },

      { x: 260, y: 500, width: 180, height: 25, type: 'wall' },
      { x: 415, y: 500, width: 25, height: 160, type: 'wall' },
      { x: 300, y: 560, width: 80, height: 50, type: 'cubicle', label: 'Bàn Bảo Vệ' },

      { x: 660, y: 80, width: 180, height: 45, type: 'cubicle', label: 'Ghế Chờ Khách VIP' }
    ],
    hidingSpots: [
      { id: 'box_4a', type: 'box', x: 120, y: 320, width: 50, height: 50, isOccupied: false },
      { id: 'plant_4a', type: 'plant', x: 280, y: 120, width: 50, height: 55, isOccupied: false },
      { id: 'plant_4b', type: 'plant', x: 420, y: 120, width: 50, height: 55, isOccupied: false },
      { id: 'desk_4a', type: 'desk', x: 550, y: 440, width: 90, height: 45, isOccupied: false },
      { id: 'box_4b', type: 'box', x: 780, y: 260, width: 50, height: 50, isOccupied: false },
      { id: 'plant_4c', type: 'plant', x: 860, y: 120, width: 45, height: 50, isOccupied: false },
      { id: 'plant_4d', type: 'plant', x: 860, y: 580, width: 45, height: 50, isOccupied: false },
      { id: 'box_4c', type: 'box', x: 980, y: 200, width: 50, height: 50, isOccupied: false }
    ],
    bosses: [
      {
        id: 'boss_tong',
        name: 'Sếp Tổng Hoàng OT',
        role: 'Trùm Cuối Tập Đoàn',
        x: 600,
        y: 200,
        width: 48,
        height: 48,
        speed: 2.2,
        facingAngle: 0,
        state: 'patrol',
        patrolPoints: [
          { x: 280, y: 120 },
          { x: 500, y: 180 },
          { x: 740, y: 180 },
          { x: 740, y: 420 },
          { x: 500, y: 420 },
          { x: 280, y: 420 },
          { x: 860, y: 120 },
          { x: 860, y: 580 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.48,
        visionDistance: 240,
        alertLevel: 0,
        skin: 'boss_male'
      },
      {
        id: 'guard_sau',
        name: 'Bác Bảo Vệ Ba',
        role: 'Gác Cổng Nghiêm Ngặt',
        x: 350,
        y: 420,
        width: 44,
        height: 44,
        speed: 1.5,
        facingAngle: Math.PI / 2,
        state: 'patrol',
        patrolPoints: [
          { x: 350, y: 380 },
          { x: 350, y: 620 },
          { x: 580, y: 620 },
          { x: 580, y: 420 },
          { x: 260, y: 460 },
          { x: 140, y: 620 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.38,
        visionDistance: 170,
        alertLevel: 0,
        skin: 'guard'
      }
    ],
    cameras: [
      {
        id: 'cam_gate',
        x: 940,
        y: 40,
        baseAngle: Math.PI * 0.5,
        sweepAngle: Math.PI * 0.4,
        currentAngle: Math.PI * 0.5,
        rotationSpeed: 0.022,
        sweepDir: 1,
        visionDistance: 240,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      },
      {
        id: 'cam_lobby',
        x: 40,
        y: 710,
        baseAngle: -Math.PI * 0.25,
        sweepAngle: Math.PI * 0.35,
        currentAngle: -Math.PI * 0.25,
        rotationSpeed: 0.015,
        sweepDir: 1,
        visionDistance: 220,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      }
    ],
    collectibles: [
      { id: 'card_final', type: 'card', name: 'Thẻ Từ Mở Cửa Cuốn', x: 320, y: 640, isCollected: false, requiredForExit: true },
      { id: 'coffee_final', type: 'coffee', name: 'Sinh Tố Bơ Full Topping', x: 740, y: 140, isCollected: false },
      { id: 'boba_final', type: 'boba', name: 'Trà Sữa Siêu Cấp', x: 140, y: 420, isCollected: false, value: 50 },
      { id: 'cash_final', type: 'bonus_cash', name: 'Tiền Thưởng Cuối Năm', x: 600, y: 550, isCollected: false, value: 100 },
      { id: 'paper_final1', type: 'paper_distraction', name: 'Lon Nước Ngọt Bật Nắp', x: 140, y: 300, isCollected: false },
      { id: 'paper_final2', type: 'paper_distraction', name: 'Hộp Đựng Bút Rơi', x: 780, y: 550, isCollected: false }
    ]
  },

  // ẢI 7: TẦNG HẦM BÃI XE B1 - BÓNG TỐI & XE MÁY
  {
    id: 7,
    title: 'ẢI 7: TẦNG HẦM B1 - BÃI GIỮ XE',
    subtitle: 'Nhiệm vụ: Tìm Chìa Khóa Xe Ga trong bóng tối, né 2 Bảo Vệ Tuần Đêm!',
    deptName: 'Khu Vực Bãi Xe Ngầm & Hầm Kỹ Thuật',
    mapWidth: 1250,
    mapHeight: 780,
    playerStart: { x: 80, y: 90 },
    exitPoint: { x: 1140, y: 640, width: 70, height: 90, requiredItemType: 'key' },
    timeLimit: 40, // 40 seconds
    dialogueIntro: [
      'Xuống tới Tầng hầm bãi xe B1! Ánh sáng chập chờn và tiếng còi bảo vệ vang lên!',
      'Hai bác bảo vệ ca đêm đang cầm đèn pin tuần tra giữa các dãy xe máy.',
      'Tìm chiếc Chìa Khóa Xe Ga rơi trên sàn rồi phi thẳng lên dốc thoát ra ngoài!'
    ],
    dialogueCaught: [
      'Bác Bảo Vệ: "Ơ kìa chú em! Chưa có vé xe mà đã dắt xe chạy đi đâu? Vào phòng viết bản kiểm điểm!"',
      'Bạn bị khóa xe lại dưới hầm đến sáng...'
    ],
    walls: [
      { x: 0, y: 0, width: 1250, height: 30, type: 'wall' },
      { x: 0, y: 750, width: 1250, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 780, type: 'wall' },
      { x: 1220, y: 0, width: 30, height: 780, type: 'wall' },

      // Cụm hàng xe máy & cột hầm
      { x: 200, y: 120, width: 260, height: 40, type: 'cubicle', label: 'Dãy Xe Ga Số 1' },
      { x: 200, y: 260, width: 260, height: 40, type: 'cubicle', label: 'Dãy Xe Số 2' },
      { x: 200, y: 400, width: 260, height: 40, type: 'cubicle', label: 'Dãy Xe Điện Số 3' },

      { x: 600, y: 80, width: 30, height: 280, type: 'wall', label: 'Trụ Cột Bê Tông Lớn' },
      { x: 600, y: 460, width: 30, height: 260, type: 'wall', label: 'Trụ Cột Bê Tông Lớn' },

      { x: 740, y: 160, width: 280, height: 40, type: 'cubicle', label: 'Dãy Ô Tô Cán Bộ' },
      { x: 740, y: 320, width: 280, height: 40, type: 'cubicle', label: 'Dãy Ô Tô Khách' },
      { x: 740, y: 480, width: 280, height: 40, type: 'cubicle', label: 'Trạm Sạc Xe Điện' }
    ],
    hidingSpots: [
      { id: 'b1_box_1', type: 'box', x: 120, y: 200, width: 50, height: 50, isOccupied: false },
      { id: 'b1_plant_1', type: 'plant', x: 500, y: 80, width: 45, height: 50, isOccupied: false },
      { id: 'b1_box_2', type: 'box', x: 500, y: 340, width: 50, height: 50, isOccupied: false },
      { id: 'b1_desk_1', type: 'desk', x: 160, y: 560, width: 80, height: 45, isOccupied: false },
      { id: 'b1_box_3', type: 'box', x: 680, y: 400, width: 50, height: 50, isOccupied: false },
      { id: 'b1_box_4', type: 'box', x: 1060, y: 220, width: 50, height: 50, isOccupied: false }
    ],
    bosses: [
      {
        id: 'guard_b1_1',
        name: 'Bác Bảo Vệ Năm',
        role: 'Tuần Đêm Hầm Xe',
        x: 350,
        y: 200,
        width: 44,
        height: 44,
        speed: 2.1,
        facingAngle: 0,
        state: 'patrol',
        patrolPoints: [
          { x: 140, y: 200 },
          { x: 350, y: 200 },
          { x: 520, y: 200 },
          { x: 520, y: 500 },
          { x: 350, y: 500 },
          { x: 140, y: 500 },
          { x: 350, y: 640 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.44,
        visionDistance: 220,
        alertLevel: 0,
        skin: 'guard'
      },
      {
        id: 'guard_b1_2',
        name: 'Bác Tuần Tra Đội Trưởng',
        role: 'Săn Xe Về Sớm',
        x: 880,
        y: 240,
        width: 46,
        height: 46,
        speed: 2.2,
        facingAngle: Math.PI,
        state: 'patrol',
        patrolPoints: [
          { x: 680, y: 120 },
          { x: 880, y: 240 },
          { x: 1080, y: 240 },
          { x: 1080, y: 560 },
          { x: 680, y: 560 },
          { x: 680, y: 320 },
          { x: 1080, y: 120 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.46,
        visionDistance: 230,
        alertLevel: 0,
        skin: 'guard'
      }
    ],
    cameras: [
      {
        id: 'cam_b1_1',
        x: 40,
        y: 40,
        baseAngle: Math.PI * 0.25,
        sweepAngle: Math.PI * 0.45,
        currentAngle: Math.PI * 0.25,
        rotationSpeed: 0.024,
        sweepDir: 1,
        visionDistance: 240,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      },
      {
        id: 'cam_b1_2',
        x: 1180,
        y: 40,
        baseAngle: Math.PI * 0.75,
        sweepAngle: Math.PI * 0.45,
        currentAngle: Math.PI * 0.75,
        rotationSpeed: 0.025,
        sweepDir: 1,
        visionDistance: 240,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      }
    ],
    collectibles: [
      { id: 'key_b1', type: 'key', name: 'Chìa Khóa Xe Ga', x: 880, y: 260, isCollected: false, requiredForExit: true },
      { id: 'coffee_b1', type: 'coffee', name: 'Bò Húc Hầm Xe', x: 140, y: 340, isCollected: false },
      { id: 'boba_b1', type: 'boba', name: 'Trà Sữa Đá Xay', x: 500, y: 220, isCollected: false, value: 50 },
      { id: 'cash_b1', type: 'bonus_cash', name: 'Tiền Phụ Cấp Ca Đêm', x: 1080, y: 120, isCollected: false, value: 80 },
      { id: 'paper_b1', type: 'paper_distraction', name: 'Cờ Lê Bỏ Quên', x: 380, y: 340, isCollected: false }
    ]
  },

  // ẢI 8: CỔNG AN NINH CHUNG KẾT TỐI THƯỢNG (VỀ NHÀ TỰ DO!)
  {
    id: 8,
    title: 'ẢI 8: CỔNG AN NINH CHUNG KẾT TỐI THƯỢNG',
    subtitle: 'Nhiệm vụ tối thượng: Lấy Thẻ Cổng Ngoài & Vé Xuất Xe, né Đại Đội Sếp Tổng để VỀ NHÀ!',
    deptName: 'Cổng Trục Chính Tòa Nhà & Rào Chắn Tự Do',
    mapWidth: 1300,
    mapHeight: 800,
    playerStart: { x: 80, y: 120 },
    exitPoint: { x: 1180, y: 360, width: 80, height: 100, requiredItemType: 'card' },
    timeLimit: 35, // 35 seconds ultimate rush
    dialogueIntro: [
      'ẢI CHUNG KẾT TỐI THƯỢNG! Cánh barie cổng sắt dẫn ra đường phố lớn!',
      'Sếp Tổng Hoàng OT, Phó TGĐ Hùng và Đội Bảo Vệ đã bao vây toàn bộ lối ra!',
      'Cứ mỗi 30-40 giây, Sếp sẽ kích hoạt KỸ NĂNG QUÉT TOÀN BỘ CỔNG!',
      'Dùng Tăng Tốc (Chạy Nhanh 3s), ném đồ phân tán và VỌT RA CỔNG TỰ DO NGAY!'
    ],
    dialogueCaught: [
      'Sếp Tổng & Phó TGĐ: "Bao vây thành công! Không một ai được tan ca trước khi ký xong 10 hợp đồng này!"',
      'Bạn bị bắt quay lại phòng họp xuyên đêm...'
    ],
    walls: [
      { x: 0, y: 0, width: 1300, height: 30, type: 'wall' },
      { x: 0, y: 770, width: 1300, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 800, type: 'wall' },
      { x: 1270, y: 0, width: 30, height: 800, type: 'wall' },

      { x: 260, y: 30, width: 30, height: 260, type: 'wall' },
      { x: 260, y: 490, width: 30, height: 280, type: 'wall' },

      { x: 550, y: 180, width: 280, height: 50, type: 'cubicle', label: 'Bốt Kiểm Soát Trung Tâm' },
      { x: 550, y: 480, width: 280, height: 50, type: 'cubicle', label: 'Dải Barie Điện Tử' },

      { x: 1020, y: 30, width: 30, height: 280, type: 'wall', label: 'Hàng Rào An Ninh Thép' },
      { x: 1020, y: 490, width: 30, height: 280, type: 'wall', label: 'Hàng Rào An Ninh Thép' }
    ],
    hidingSpots: [
      { id: 'gate_box_1', type: 'box', x: 140, y: 220, width: 50, height: 50, isOccupied: false },
      { id: 'gate_plant_1', type: 'plant', x: 380, y: 100, width: 45, height: 50, isOccupied: false },
      { id: 'gate_box_2', type: 'box', x: 440, y: 360, width: 50, height: 50, isOccupied: false },
      { id: 'gate_plant_2', type: 'plant', x: 740, y: 100, width: 45, height: 50, isOccupied: false },
      { id: 'gate_box_3', type: 'box', x: 880, y: 360, width: 50, height: 50, isOccupied: false },
      { id: 'gate_box_4', type: 'box', x: 1100, y: 200, width: 50, height: 50, isOccupied: false }
    ],
    bosses: [
      {
        id: 'boss_tong_final',
        name: 'Sếp Tổng Hoàng OT (CUỒNG NỘ)',
        role: 'Trùm Cuối Tập Đoàn',
        x: 680,
        y: 280,
        width: 50,
        height: 50,
        speed: 2.3,
        facingAngle: 0,
        state: 'patrol',
        patrolPoints: [
          { x: 140, y: 120 },
          { x: 420, y: 120 },
          { x: 420, y: 280 },
          { x: 920, y: 280 },
          { x: 920, y: 420 },
          { x: 420, y: 420 },
          { x: 140, y: 420 },
          { x: 680, y: 620 },
          { x: 1100, y: 620 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.5,
        visionDistance: 260,
        alertLevel: 0,
        skin: 'boss_male'
      },
      {
        id: 'boss_hung_final',
        name: 'Phó TGĐ Hùng',
        role: 'Tầm Nhìn 360',
        x: 850,
        y: 140,
        width: 46,
        height: 46,
        speed: 2.1,
        facingAngle: Math.PI / 2,
        state: 'patrol',
        patrolPoints: [
          { x: 850, y: 120 },
          { x: 850, y: 420 },
          { x: 850, y: 640 },
          { x: 950, y: 640 },
          { x: 950, y: 120 },
          { x: 680, y: 120 },
          { x: 1100, y: 200 },
          { x: 1100, y: 500 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.46,
        visionDistance: 240,
        alertLevel: 0,
        skin: 'boss_male'
      }
    ],
    cameras: [
      {
        id: 'cam_gate_final_1',
        x: 40,
        y: 40,
        baseAngle: Math.PI * 0.25,
        sweepAngle: Math.PI * 0.45,
        currentAngle: Math.PI * 0.25,
        rotationSpeed: 0.026,
        sweepDir: 1,
        visionDistance: 250,
        fieldOfView: Math.PI * 0.36,
        isActive: true
      },
      {
        id: 'cam_gate_final_2',
        x: 1040,
        y: 40,
        baseAngle: Math.PI * 0.7,
        sweepAngle: Math.PI * 0.45,
        currentAngle: Math.PI * 0.7,
        rotationSpeed: 0.028,
        sweepDir: 1,
        visionDistance: 260,
        fieldOfView: Math.PI * 0.36,
        isActive: true
      }
    ],
    collectibles: [
      { id: 'card_final_gate', type: 'card', name: 'Thẻ Mở Cổng Barie', x: 680, y: 380, isCollected: false, requiredForExit: true },
      { id: 'coffee_final_gate', type: 'coffee', name: 'Cà Phê Thần Tốc', x: 140, y: 440, isCollected: false },
      { id: 'boba_final_gate', type: 'boba', name: 'Trà Sữa Hoàng Gia Đặc Biệt', x: 400, y: 640, isCollected: false, value: 60 },
      { id: 'cash_final_gate', type: 'bonus_cash', name: 'Thưởng Đại Thắng Tan Ca', x: 1100, y: 640, isCollected: false, value: 150 },
      { id: 'paper_final_gate', type: 'paper_distraction', name: 'Pháo Giấy Đánh Lạc Hướng', x: 440, y: 120, isCollected: false }
    ]
  }
];

/**
 * Ensures all collectible items have a safe buffer of at least 45px from any wall or cubicle
 */
export function sanitizeFloorItems(level: FloorLevel): FloorLevel {
  const cloned = JSON.parse(JSON.stringify(level)) as FloorLevel;
  const safeMargin = 45;

  cloned.collectibles.forEach((item) => {
    for (const wall of cloned.walls) {
      // Check if point is inside or too close to wall rect
      const left = wall.x - safeMargin;
      const right = wall.x + wall.width + safeMargin;
      const top = wall.y - safeMargin;
      const bottom = wall.y + wall.height + safeMargin;

      if (item.x >= left && item.x <= right && item.y >= top && item.y <= bottom) {
        // Displace item out of obstacle towards nearest safe side
        const distToLeft = Math.abs(item.x - left);
        const distToRight = Math.abs(item.x - right);
        const distToTop = Math.abs(item.y - top);
        const distToBottom = Math.abs(item.y - bottom);
        const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

        if (minDist === distToLeft) {
          item.x = Math.max(45, wall.x - safeMargin - 15);
        } else if (minDist === distToRight) {
          item.x = Math.min(cloned.mapWidth - 45, wall.x + wall.width + safeMargin + 15);
        } else if (minDist === distToTop) {
          item.y = Math.max(45, wall.y - safeMargin - 15);
        } else {
          item.y = Math.min(cloned.mapHeight - 45, wall.y + wall.height + safeMargin + 15);
        }
      }
    }
  });

  return cloned;
}

/**
 * Procedural Endless Level Generator
 */
export function generateEndlessFloor(floorNumber: number): FloorLevel {
  const width = 1100 + Math.min(floorNumber * 50, 400);
  const height = 700 + Math.min(floorNumber * 40, 300);

  const numBosses = Math.min(1 + Math.floor(floorNumber / 2), 4);
  const numCameras = Math.min(Math.floor(floorNumber / 2), 4);
  const baseSpeed = 1.8 + Math.min(floorNumber * 0.15, 1.2);

  const bosses = [];
  for (let i = 0; i < numBosses; i++) {
    const cx = 350 + (i * 260) % (width - 450);
    const cy = 200 + ((i * 180) % (height - 350));
    bosses.push({
      id: `endless_boss_${floorNumber}_${i}`,
      name: i === 0 ? `Sếp Tổng Tầng ${floorNumber}` : `Phó Phòng ${i + 1}`,
      role: 'Đội Săn Nhân Viên Về Sớm',
      x: cx,
      y: cy,
      width: 44,
      height: 44,
      speed: baseSpeed + (i % 2 === 0 ? 0.2 : -0.1),
      facingAngle: Math.random() * Math.PI * 2,
      state: 'patrol' as const,
      patrolPoints: [
        { x: cx - 120, y: cy - 80 },
        { x: cx + 120, y: cy - 80 },
        { x: cx + 120, y: cy + 80 },
        { x: cx - 120, y: cy + 80 }
      ],
      currentPointIndex: 0,
      investigateTimer: 0,
      fieldOfView: Math.PI * 0.44,
      visionDistance: 210 + Math.min(floorNumber * 10, 70),
      alertLevel: 0,
      skin: (i % 3 === 0 ? 'boss_male' : i % 3 === 1 ? 'boss_female' : 'hr_snitch') as 'boss_male' | 'boss_female' | 'hr_snitch'
    });
  }

  const cameras = [];
  for (let c = 0; c < numCameras; c++) {
    const isTop = c % 2 === 0;
    cameras.push({
      id: `endless_cam_${floorNumber}_${c}`,
      x: 300 + c * 260,
      y: isTop ? 40 : height - 40,
      baseAngle: isTop ? Math.PI * 0.5 : -Math.PI * 0.5,
      sweepAngle: Math.PI * 0.4,
      currentAngle: isTop ? Math.PI * 0.5 : -Math.PI * 0.5,
      rotationSpeed: 0.018 + c * 0.005,
      sweepDir: 1,
      visionDistance: 220,
      fieldOfView: Math.PI * 0.35,
      isActive: true
    });
  }

  const timeLimit = Math.max(30, 70 - floorNumber * 5);

  const rawLevel: FloorLevel = {
    id: 100 + floorNumber,
    title: `TẦNG SINH TỒN #${floorNumber}`,
    subtitle: `Thử thách trốn sếp bất tận - Tầng ${floorNumber}`,
    deptName: `Tập Đoàn Vô Tận Tầng ${floorNumber}`,
    mapWidth: width,
    mapHeight: height,
    playerStart: { x: 70, y: 70 },
    exitPoint: { x: width - 90, y: height - 100, width: 65, height: 80, requiredItemType: 'card' },
    timeLimit,
    dialogueIntro: [
      `Bạn vừa bước vào Tầng ${floorNumber}!`,
      `Sếp và nhân sự đang đi tuần gắt gao hơn. Hãy tìm Thẻ Ra Cổng để tiếp tục trốn thoát!`
    ],
    dialogueCaught: [
      `Bạn đã bị bắt lại tại Tầng ${floorNumber}!`,
      `Kỷ lục trốn thoát dừng lại ở đây...`
    ],
    walls: [
      { x: 0, y: 0, width: width, height: 30, type: 'wall' },
      { x: 0, y: height - 30, width: width, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: height, type: 'wall' },
      { x: width - 30, y: 0, width: 30, height: height, type: 'wall' },
      { x: 220, y: 150, width: 200, height: 45, type: 'cubicle', label: 'Cụm Bàn 1' },
      { x: 550, y: 150, width: 220, height: 45, type: 'cubicle', label: 'Cụm Bàn 2' },
      { x: 350, y: 350, width: 260, height: 45, type: 'cubicle', label: 'Bàn Họp Giữa' },
      { x: 200, y: 500, width: 220, height: 45, type: 'cubicle', label: 'Cụm Bàn 3' },
      { x: 600, y: 500, width: 220, height: 45, type: 'cubicle', label: 'Cụm Bàn 4' }
    ],
    hidingSpots: [
      { id: `box_e1_${floorNumber}`, type: 'box', x: 120, y: 240, width: 50, height: 50, isOccupied: false },
      { id: `plant_e1_${floorNumber}`, type: 'plant', x: 480, y: 90, width: 45, height: 50, isOccupied: false },
      { id: `box_e2_${floorNumber}`, type: 'box', x: 680, y: 330, width: 50, height: 50, isOccupied: false },
      { id: `plant_e2_${floorNumber}`, type: 'plant', x: 480, y: 590, width: 45, height: 50, isOccupied: false }
    ],
    bosses,
    cameras,
    collectibles: [
      // Placed in open corridor: y=250 is safely between desks (desk 1 & 2 end at y=195, middle desk starts at y=350)
      { id: `endless_card_${floorNumber}`, type: 'card', name: 'Thẻ Từ Tầng ' + floorNumber, x: width / 2, y: 250, isCollected: false, requiredForExit: true },
      { id: `endless_coffee_${floorNumber}`, type: 'coffee', name: 'Cà Phê Tăng Tốc', x: 120, y: height - 120, isCollected: false },
      { id: `endless_boba_${floorNumber}`, type: 'boba', name: 'Trà Sữa Sinh Tồn', x: width / 2 + 100, y: 100, isCollected: false, value: 50 },
      { id: `endless_cash_${floorNumber}`, type: 'bonus_cash', name: 'Thưởng Vượt Tầng', x: width - 200, y: height - 180, isCollected: false, value: 60 },
      { id: `endless_paper_${floorNumber}`, type: 'paper_distraction', name: 'Đồ Ném Lạc Hướng', x: width - 150, y: 90, isCollected: false }
    ]
  };

  return sanitizeFloorItems(rawLevel);
}
