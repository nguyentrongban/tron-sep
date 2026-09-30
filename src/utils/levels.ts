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
  dialogueIntro: [
    'Chào mừng thực tập sinh mới! Bí kíp số 1 để tồn tại ở công sở: "Tan ca đúng giờ"!',
    '1. Dùng WASD hoặc Cần gạt để di chuyển đến bàn làm việc.',
    '2. Giữ Rón Rén (Space) khi đi qua sếp đang lơ đễnh.',
    '3. Nhấn [E] để chui vào Thùng Giấy ẩn nấp.',
    '4. Nhấn [Q] ném cốc dụ sếp ra xa, lấy Thẻ Chấm Công và thoát ra ngoài!'
  ],
  dialogueCaught: [
    'Sếp Huấn Luyện: "Bị phát hiện rồi em ơi! Nhớ chui vào Thùng [E] hoặc Rón Rén [Space] nhé!"',
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
        { x: 620, y: 220 },
        { x: 620, y: 360 }
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
  {
    id: 1,
    title: 'TẦNG 4: PHÒNG DEV & IT',
    subtitle: 'Nhiệm vụ: Lấy Ba Lô & Chìa Khóa Xe máy rồi trốn ra Cầu Thang!',
    deptName: 'Phòng Phát Triển Phần Mềm',
    mapWidth: 1000,
    mapHeight: 700,
    playerStart: { x: 80, y: 100 },
    exitPoint: { x: 920, y: 580, width: 60, height: 80, requiredItemType: 'key' },
    dialogueIntro: [
      'Đồng hồ điểm đúng 17:30! Chuông tan ca vừa reo.',
      'Sếp Tuấn IT đang lượn quanh các bàn: "Ai rảnh debug hộ cái ticket hotfix này nhé!"',
      'Mau lẻn lấy Ba Lô và Chìa Khóa xe máy rồi phi ra cửa cầu thang bộ ngay!'
    ],
    dialogueCaught: [
      'Sếp Tuấn IT: "Á à! Định chuồn hả em? Vào đây test lại API 200 endpoint này đã!"',
      'Bạn bị ép OT đến 23:00 và ăn mì tôm úp lạnh ngắt...'
    ],
    walls: [
      // Outer border walls
      { x: 0, y: 0, width: 1000, height: 30, type: 'wall' },
      { x: 0, y: 670, width: 1000, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 700, type: 'wall' },
      { x: 970, y: 0, width: 30, height: 700, type: 'wall' },

      // Cubicles Block 1 (Top Left)
      { x: 60, y: 200, width: 220, height: 40, type: 'cubicle', label: 'Bàn Dev 1' },
      { x: 60, y: 320, width: 220, height: 40, type: 'cubicle', label: 'Bàn Dev 2' },

      // Cubicles Block 2 (Center)
      { x: 400, y: 120, width: 240, height: 45, type: 'cubicle', label: 'Cụm QA/Tester' },
      { x: 400, y: 260, width: 240, height: 45, type: 'cubicle', label: 'Cụm Frontend' },
      { x: 400, y: 400, width: 240, height: 45, type: 'cubicle', label: 'Cụm Backend' },

      // Server Room partition (Right side)
      { x: 740, y: 30, width: 20, height: 260, type: 'wall' },
      { x: 740, y: 290, width: 150, height: 20, type: 'wall' },
      { x: 800, y: 80, width: 140, height: 50, type: 'server', label: 'Tủ Rack Server' },
      { x: 800, y: 170, width: 140, height: 50, type: 'server', label: 'Máy Chủ Dữ Liệu' },

      // Pantry / Water cooler area (Bottom Left)
      { x: 60, y: 460, width: 180, height: 20, type: 'wall' },
      { x: 230, y: 460, width: 20, height: 160, type: 'wall' },
      { x: 80, y: 500, width: 45, height: 45, type: 'water_cooler', label: 'Bình Nước' },

      // Exit corridor partition
      { x: 740, y: 420, width: 230, height: 20, type: 'wall' },
      { x: 740, y: 420, width: 20, height: 250, type: 'wall' }
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
          { x: 350, y: 190 },
          { x: 680, y: 190 },
          { x: 680, y: 340 },
          { x: 350, y: 340 },
          { x: 350, y: 480 },
          { x: 680, y: 480 }
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
      { id: 'backpack_1', type: 'backpack', name: 'Ba Lô Đi Làm', x: 120, y: 380, isCollected: false, requiredForExit: false },
      { id: 'key_1', type: 'key', name: 'Chìa Khóa Xe Máy', x: 880, y: 230, isCollected: false, requiredForExit: true },
      { id: 'coffee_1', type: 'coffee', name: 'Cà Phê Muối (Tăng tốc)', x: 150, y: 530, isCollected: false },
      { id: 'paper_1', type: 'paper_distraction', name: 'Cốc Giấy Ném Lạc Hướng', x: 330, y: 100, isCollected: false },
      { id: 'paper_2', type: 'paper_distraction', name: 'Vỏ Lon Ném Lạc Hướng', x: 500, y: 560, isCollected: false },
      { id: 'cash_1', type: 'bonus_cash', name: 'Phong Bì Dự Án', x: 880, y: 100, isCollected: false, value: 50 },
      { id: 'boba_1', type: 'boba', name: 'Trà Sữa Trân Châu 70% Đường', x: 180, y: 500, isCollected: false, value: 40 }
    ]
  },

  {
    id: 2,
    title: 'TẦNG 3: MARKETING & TRUYỀN THÔNG',
    subtitle: 'Nhiệm vụ: Lấy Thẻ Chấm Công ở máy in, né Trưởng Phòng & HR mách lẻo!',
    deptName: 'Phòng Marketing & Sáng Tạo',
    mapWidth: 1050,
    mapHeight: 720,
    playerStart: { x: 70, y: 620 },
    exitPoint: { x: 940, y: 80, width: 60, height: 75, requiredItemType: 'card' },
    dialogueIntro: [
      'Bạn vừa xuống tới Tầng 3! Cẩn thận, sếp Hạnh Marketing và em Linh HR đang buôn chuyện ở góc phòng.',
      'Thẻ chấm công bị quên ở Máy Photocopy to đùng phía trên.',
      'Nếu không có thẻ, cửa thang máy sẽ không mở!'
    ],
    dialogueCaught: [
      'Chị Hạnh MKT: "Em ơi! Trend TikTok mới bùng nổ rồi, tối nay ở lại brainstorm 100 kịch bản nhé!"',
      'Bạn bị bắt ngồi viết content đến sáng hôm sau...'
    ],
    walls: [
      // Border
      { x: 0, y: 0, width: 1050, height: 30, type: 'wall' },
      { x: 0, y: 690, width: 1050, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 720, type: 'wall' },
      { x: 1020, y: 0, width: 30, height: 720, type: 'wall' },

      // Meeting room glass walls (Center Top)
      { x: 340, y: 30, width: 20, height: 260, type: 'wall' },
      { x: 340, y: 270, width: 280, height: 20, type: 'wall' },
      { x: 600, y: 30, width: 20, height: 180, type: 'wall' },

      // Open workspace tables
      { x: 100, y: 160, width: 180, height: 50, type: 'cubicle', label: 'Bàn Thiết Kế' },
      { x: 100, y: 340, width: 180, height: 50, type: 'cubicle', label: 'Bàn Content' },
      { x: 100, y: 480, width: 180, height: 50, type: 'cubicle', label: 'Bàn Media' },

      // Large Printer room (Top Right)
      { x: 740, y: 30, width: 20, height: 220, type: 'wall' },
      { x: 740, y: 230, width: 280, height: 20, type: 'wall' },
      { x: 820, y: 90, width: 80, height: 70, type: 'printer', label: 'Máy In Photocopy' },

      // Breakout Lounge (Bottom Right)
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
          { x: 450, y: 100 },
          { x: 550, y: 220 },
          { x: 480, y: 350 },
          { x: 380, y: 220 }
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
          { x: 850, y: 620 }
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
      { id: 'card_1', type: 'card', name: 'Thẻ Chấm Công VIP', x: 930, y: 120, isCollected: false, requiredForExit: true },
      { id: 'coffee_2', type: 'coffee', name: 'Matcha Đá Xay', x: 120, y: 80, isCollected: false },
      { id: 'paper_2a', type: 'paper_distraction', name: 'Tập Kế Hoạch Bỏ Đi', x: 260, y: 440, isCollected: false },
      { id: 'paper_2b', type: 'paper_distraction', name: 'Ly Trà Sữa Đã Uống', x: 740, y: 340, isCollected: false }
    ]
  },
  {
    id: 3,
    title: 'TẦNG 2: BAN GIÁM ĐỐC & KẾ TOÁN',
    subtitle: 'Nhiệm vụ: Né Camera Quét Laser & Lấy Chìa Khóa Thang Máy VIP!',
    deptName: 'Khu Vực Ban Điều Hành & Tài Chính',
    mapWidth: 1100,
    mapHeight: 740,
    playerStart: { x: 70, y: 80 },
    exitPoint: { x: 980, y: 630, width: 60, height: 75, requiredItemType: 'key' },
    dialogueIntro: [
      'Tầng 2 được trang bị Camera an ninh quét 360 độ cực kỳ nhạy!',
      'Phó Tổng Giám Đốc Hùng đang rà soát hợp đồng. Sếp nghe rất thính, đừng chạy gần sếp!',
      'Lấy Chìa Khóa Thang Máy trong phòng Kế toán để xuống Đại sảnh!'
    ],
    dialogueCaught: [
      'Sếp Hùng Phó TGĐ: "Cậu kia! Báo cáo tài chính quý này sai 1 đồng, ở lại rà soát hết 2.000 trang Excel!"',
      'Đêm nay bạn làm bạn cùng những con số đến phát khóc...'
    ],
    walls: [
      // Border
      { x: 0, y: 0, width: 1100, height: 30, type: 'wall' },
      { x: 0, y: 710, width: 1100, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 740, type: 'wall' },
      { x: 1070, y: 0, width: 30, height: 740, type: 'wall' },

      // CEO Office (Center)
      { x: 380, y: 160, width: 340, height: 25, type: 'wall' },
      { x: 380, y: 160, width: 25, height: 240, type: 'wall' },
      { x: 700, y: 160, width: 25, height: 240, type: 'wall' },
      { x: 380, y: 400, width: 120, height: 25, type: 'wall' },
      { x: 600, y: 400, width: 125, height: 25, type: 'wall' },
      { x: 480, y: 220, width: 140, height: 60, type: 'cubicle', label: 'Bàn Làm Việc Giám Đốc' },

      // Accounting room (Bottom Left)
      { x: 30, y: 450, width: 280, height: 25, type: 'wall' },
      { x: 285, y: 450, width: 25, height: 260, type: 'wall' },
      { x: 80, y: 520, width: 150, height: 45, type: 'cubicle', label: 'Bàn Kế Toán Trưởng' },

      // Top corridor partition
      { x: 220, y: 30, width: 25, height: 180, type: 'wall' },
      { x: 800, y: 30, width: 25, height: 220, type: 'wall' },

      // Safe room (Right)
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
        id: 'boss_hung',
        name: 'Sếp Hùng Phó TGĐ',
        role: 'Vua OT Không Lối Thoát',
        x: 550,
        y: 290,
        width: 46,
        height: 46,
        speed: 2.1,
        facingAngle: Math.PI / 2,
        state: 'patrol',
        patrolPoints: [
          { x: 550, y: 300 },
          { x: 550, y: 520 },
          { x: 200, y: 320 },
          { x: 550, y: 320 },
          { x: 880, y: 320 },
          { x: 550, y: 520 }
        ],
        currentPointIndex: 0,
        investigateTimer: 0,
        fieldOfView: Math.PI * 0.45,
        visionDistance: 230,
        alertLevel: 0,
        skin: 'boss_male'
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
        rotationSpeed: 0.015,
        sweepDir: 1,
        visionDistance: 200,
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
      },
      {
        id: 'cam_3',
        x: 810,
        y: 570,
        baseAngle: Math.PI * 0.9,
        sweepAngle: Math.PI * 0.4,
        currentAngle: Math.PI * 0.9,
        rotationSpeed: 0.018,
        sweepDir: 1,
        visionDistance: 190,
        fieldOfView: Math.PI * 0.35,
        isActive: true
      }
    ],
    collectibles: [
      { id: 'key_3', type: 'key', name: 'Chìa Khóa Thang Máy VIP', x: 120, y: 620, isCollected: false, requiredForExit: true },
      { id: 'coffee_3', type: 'coffee', name: 'RedBull Tăng Lực', x: 950, y: 160, isCollected: false },
      { id: 'paper_3a', type: 'paper_distraction', name: 'Cục Tẩy Ném Lạc Hướng', x: 260, y: 120, isCollected: false },
      { id: 'paper_3b', type: 'paper_distraction', name: 'Tài Liệu Hủy Vo Tròn', x: 540, y: 640, isCollected: false }
    ]
  },
  {
    id: 4,
    title: 'TẦNG 1: ĐẠI SẢNH & CỬA THOÁT HIỂM',
    subtitle: 'Nhiệm vụ cuối: Lấy Thẻ Mở Cửa Cuốn & Phi Ra Ngoài Tự Do!',
    deptName: 'Sảnh Lễ Tân & Cổng Chính Tòa Nhà',
    mapWidth: 1200,
    mapHeight: 760,
    playerStart: { x: 80, y: 120 },
    exitPoint: { x: 1080, y: 350, width: 70, height: 90, requiredItemType: 'card' },
    dialogueIntro: [
      'Đây là tầng trệt! Cánh cửa tự do đang ở ngay trước mắt bạn!',
      'Sếp Tổng đích thân phục kích ở khu vực Lễ tân để chặn bất cứ ai về trước 19:00!',
      'Bác bảo vệ đang gà gật ở bàn an ninh. Hãy rón rén lấy Thẻ Từ Cửa Cuốn rồi vọt ra!',
      'Cố lên! Bạn sắp được về uống trà sữa và ngủ một giấc thật ngon rồi!'
    ],
    dialogueCaught: [
      'Sếp Tổng: "Haha! Bắt được chú em rồi nhé! Cả công ty chưa ai về, ai cho chú về hả?!"',
      'Bạn bị giữ lại làm lễ tân xuyên đêm...'
    ],
    walls: [
      // Border
      { x: 0, y: 0, width: 1200, height: 30, type: 'wall' },
      { x: 0, y: 730, width: 1200, height: 30, type: 'wall' },
      { x: 0, y: 0, width: 30, height: 760, type: 'wall' },
      { x: 1170, y: 0, width: 30, height: 760, type: 'wall' },

      // Elevator Bank partitions (Top Left)
      { x: 30, y: 220, width: 220, height: 25, type: 'wall' },
      { x: 225, y: 30, width: 25, height: 200, type: 'wall' },

      // Reception Grand Desk (Center)
      { x: 480, y: 260, width: 240, height: 70, type: 'cubicle', label: 'Quầy Lễ Tân Đại Sảnh' },

      // Turnstile barrier (Security gates before exit)
      { x: 920, y: 30, width: 25, height: 270, type: 'wall', label: 'Hàng Rào An Ninh' },
      { x: 920, y: 450, width: 25, height: 280, type: 'wall', label: 'Hàng Rào An Ninh' },

      // Security booth (Bottom Left)
      { x: 260, y: 500, width: 180, height: 25, type: 'wall' },
      { x: 415, y: 500, width: 25, height: 160, type: 'wall' },
      { x: 300, y: 560, width: 80, height: 50, type: 'cubicle', label: 'Bàn Bảo Vệ' },

      // Waiting lounge (Top Right)
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
          { x: 500, y: 180 },
          { x: 740, y: 180 },
          { x: 740, y: 420 },
          { x: 500, y: 420 }
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
          { x: 350, y: 460 },
          { x: 260, y: 460 }
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
      { id: 'card_final', type: 'card', name: 'Thẻ Từ Mở Cửa Cuốn', x: 340, y: 620, isCollected: false, requiredForExit: true },
      { id: 'coffee_final', type: 'coffee', name: 'Sinh Tố Bơ Full Topping', x: 740, y: 100, isCollected: false },
      { id: 'paper_final1', type: 'paper_distraction', name: 'Lon Nước Ngọt Bật Nắp', x: 120, y: 450, isCollected: false },
      { id: 'paper_final2', type: 'paper_distraction', name: 'Hộp Đựng Bút Rơi', x: 780, y: 550, isCollected: false }
    ]
  }
];

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

  return {
    id: 100 + floorNumber,
    title: `TẦNG SINH TỒN #${floorNumber}`,
    subtitle: `Thử thách trốn sếp bất tận - Tầng ${floorNumber}`,
    deptName: `Tập Đoàn Vô Tận Tầng ${floorNumber}`,
    mapWidth: width,
    mapHeight: height,
    playerStart: { x: 70, y: 70 },
    exitPoint: { x: width - 90, y: height - 100, width: 65, height: 80, requiredItemType: 'card' },
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
      { id: `endless_card_${floorNumber}`, type: 'card', name: 'Thẻ Từ Tầng ' + floorNumber, x: width / 2, y: height / 2, isCollected: false, requiredForExit: true },
      { id: `endless_coffee_${floorNumber}`, type: 'coffee', name: 'Cà Phê Tăng Tốc', x: 100, y: height - 120, isCollected: false },
      { id: `endless_paper_${floorNumber}`, type: 'paper_distraction', name: 'Đồ Ném Lạc Hướng', x: width - 150, y: 100, isCollected: false }
    ]
  };
}
