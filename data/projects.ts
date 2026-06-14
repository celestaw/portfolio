// =============================================================
//  制作物データ
//  ここがポートフォリオの本体。文章・リンク・画像をここで管理する。
//  TODO と書かれた箇所は、渡邉が実物（動画URL/GitHub/画像）を差し込む。
//  画像は public/works/ 配下に置き、cover に "/works/xxx.jpg" の形で指定。
// =============================================================

export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;        // 一覧カードに出る一行
  period: string;         // "2025/04 –"
  role: string;           // "個人" | "研究" | "チーム(PM)" など
  category: "research" | "hci" | "game" | "ai" | "team" | "theory" | "tool";
  stack: string[];        // 使用技術タグ
  cover?: string;         // カード/詳細トップの画像パス（未設定ならグラデ）
  featured: boolean;      // true のものだけ詳細本文を持つ
  // --- 詳細ページ本文（featured のみ）---
  overview?: string[];    // 概要（段落配列）
  motivation?: string[];  // 動機（なぜ作ったか）
  system?: string[];      // システム/技術構成
  contribution?: string[];// 自分の担当（チーム制作時に明確化）
  limits?: string[];      // 制約・できなかったこと（正直に書く欄）
  links?: Link[];         // 動画/GitHub/論文 など
  media?: { type: "video" | "image"; src: string; caption?: string }[];
};

export const projects: Project[] = [
  // ============================================================
  // 1. 研究 — 回転LED空中立体ディスプレイ（最重要）
  // ============================================================
  {
    slug: "volumetric-led-display",
    title: "回転LEDアレイによる空中立体ディスプレイ",
    tagline: "曲面状LEDアレイの高速回転による残像で空中に立体像を提示するディスプレイ",
    period: "2025/04 –",
    role: "研究（個人）",
    category: "research",
    stack: ["ESP32", "C/C++", "PlatformIO", "APA102", "CAP1188", "BLDCモータ"],
    cover: "/works/3DLEDdisp.png",
    featured: true,
    overview: [
      "曲面状に配置したLEDアレイを高速回転させ、残像に映像を映すことより空中へ立体像を提示するディスプレイを研究している。",
      "提示した立体像に対し、ユーザーが直接手を触れて操作できるインタラクションの実現を目標とする。ヘッドマウントディスプレイを介さず、現実空間に直接像を提示する点が本研究の特徴である。",
    ],
    motivation: [
      "立体像に直接触れて操作できるディスプレイが実現すれば、空想上の存在とのインタラクションが可能になり、新たな体験や価値観を生み出せると考えたことが動機である。",
    ],
    system: [
      "先行プロジェクト BloomBeacon の部品構成を参照しながら必要な部品を把握している段階である。",
      "現段階では、先行プロジェクト BloomBeacon に忠実なプロトタイプの再現を通して、PWM制御・トランジスタによるスイッチング・LED点灯タイミングと回転位相の同期といった基礎を一つずつ実装で確かめている。",
    ],
    contribution: [
      "理論計算機科学（後述のTaiji研究）を出自とし、未経験だったハードウェア領域に個人で踏み込んでいる。先行プロジェクト BloomBeacon を参照しながら、LEDの点灯・PWM・スイッチングといった基礎を、手を動かして一つずつ習得している段階である。",
    ],
    limits: [
      "現時点では BloomBeacon 準拠プロトタイプの再現段階であり、触覚インタラクションは未実装。立体像の解像度・輝度・回転同期の精度はこれからの課題である。",
    ],
    links: [
      { label: "デモ動画（準備中）", href: "#" },
      { label: "リポジトリ（準備中）", href: "#" },
    ],
    media: [
      {
        type: "image",
        src: "/works/3DLEDdisp.png",
        caption: "システム構成のスケッチ（曲面状LEDアレイ・回転軸・センサ配置）",
      },
    ],
  },

  // ============================================================
  // 2. Witness IRL
  // ============================================================
  {
    slug: "witness-irl",
    title: "Witness IRL",
    tagline: "カメラ映像から特定の図形パターンを検出・判別し、実際のゲームのように指でなぞれるプログラム",
    period: "2024 –",
    role: "個人",
    category: "hci",
    stack: ["Python", "DeepLabV3+", "MobileNetV2", "YOLO11-seg", "セマンティックセグメンテーション"],
    cover: "/works/witness-irl-real.png",
    featured: true,
    overview: [
      "パズルゲーム The Witness の仕掛けを現実世界で再現することを目的とし、カメラ映像中から特定の図形パターンを検出・判別するプログラムを制作した。",
      "画面内の体験を現実空間へ展開する課題であり、空間認識とセンシングを実装を通して扱った。",
      "発見したパズルは指でなぞり実際のゲームと同様に解くことができる。"
    ],
    motivation: [
      "コンピュータビジョンで何かを制作する課題をきっかけに着想した。図形を検出できれば The Witness の風景に隠れたパズルを見逃さずに済むのではないか、さらにあのゲーム体験を現実空間へ持ち込めないか、と考えたことが動機である。",
    ],
    system: [
      "セグメンテーションに DeepLabV3を用い、PC上で動作するプロトタイプを構築した。ファインチューニングに先行研究のアノテーション画像と自身で書いた画像データを用いている。",
      "mac上で動くアプリケーションも別で存在している",
    ],
    contribution: [
      "データ収集・モデル選定・学習・推論パイプラインまでをClaude codeと協力して実装。",
    ],
    limits: [
      "現実における図形認識の安定性が低く、カメラを固定する、かなりはっきりとしたパズル図形を出現させるなどを行わないと認識されにくい",
    ],
    links: [
      { label: "リポジトリ (GitHub)", href: "https://github.com/celestaw/the_witness_founder" },
      { label: "デモ動画（準備中）", href: "#" },
    ],
    media: [
      {
        type: "image",
        src: "/works/witness-irl-real.png",
        caption: "現実空間でのパズルパターン検出（実機テスト）",
      },
      {
        type: "image",
        src: "/works/witness-irl-ingame.png",
        caption: "ゲーム The Witness の映像に対する検出",
      },
    ],
  },

  // ============================================================
  // 3. Unity リズムゲーム
  // ============================================================
  {
    slug: "rhythm-game",
    title: "リズムゲーム（魔法陣ノーツ）",
    tagline: "ノーツの出現と判定に二つのリズムを持たせ、攻撃示唆と攻撃判定を兼ねさせる戦闘リズムゲーム",
    period: "2024 –",
    role: "個人",
    category: "game",
    stack: ["Unity", "C#", "AudioSettings.dspTime", "ゲーム設計"],
    cover: "/works/magiccircle.png",
    featured: true,
    overview: [
      "戦闘を基調とするリズムゲームとして設計・開発している。",
      "本作のノーツは、出現してから判定されるまでの時間が一定ではなく、出現時間と判定時間という二つのリズムタイミングを独立に設定できる点に特徴がある。これにより、ノーツの出現が『攻撃の示唆』を、判定が『攻撃の発生』を表すという、二重の視覚効果を生み出せる。この機構を中核に据えたゲームを設計しているが、ゲームとしてはまだ完成に至っていない。",
    ],
    motivation: [
      "一般の音楽ゲームは打鍵（判定）のタイミングを重視し、予告となるノーツの出現タイミング自体にリズムを持たせる例は多くない。出現と判定の双方がリズムに沿う音楽ゲームを作れば面白いと考えたことが動機である。",
      "さらに、出現タイミングと判定タイミングが独立である性質を活かし、両者を別々のプレイヤーが担う対戦（PvP）など、従来にない遊びへ発展させることも構想している。",
    ],
    system: [
      "タイミングの基準に AudioSettings.dspTime を用い、フレームレートに依存しない判定を実装している。ノーツの出現タイミングと判定タイミングを別々に制御できる構造とし、両者の差（表示から判定までの時間）を可変にすることで、上記の二重タイミングを実現している。",
    ],
    contribution: [
      "企画・ノーツ機構の設計・実装まで個人。",
    ],
    limits: [
      "Unity でプロトタイプを実装したが、現在は UE5 への移行を予定している。アート/サウンドは外部素材に依存しており、ゲーム全体としては制作途上である。",
    ],
    links: [
      { label: "プレイ動画（準備中）", href: "#" },
    ],
    media: [
      {
        type: "image",
        src: "/works/magiccircle.png",
        caption: "魔法陣ノーツのプレイ画面（Unity版プロトタイプ・判定演出）",
      },
    ],
  },

  // ============================================================
  // 4. ローカル画像生成 / LoRA
  // ============================================================
  {
    slug: "local-image-generation",
    title: "ローカル画像生成と LoRA 学習",
    tagline: "Stable Diffusion / FLUX のローカル運用と LoRA のファインチューニング",
    period: "2024 –",
    role: "個人",
    category: "ai",
    stack: ["Stable Diffusion", "FLUX", "ComfyUI", "Stability Matrix"],
    // cover: "/works/image-gen.jpg", // TODO: 画像を置いたら設定
    featured: true,
    overview: [
      "生成 AI を利用するだけでなく、ローカル環境で運用・調整できる構成を構築した。",
      "表現手段へ生成 AI を組み込むための基盤として位置づけている。",
    ],
    system: [
      "ComfyUI / Stability Matrix を用いて Stable Diffusion・FLUX をローカルで運用。RTX 5070 Ti 環境で kohya_ss による LoRA のファインチューニング（顔・キャラクタ生成）を行っている。",
    ],
    contribution: [
      "環境構築・モデル運用・LoRA学習まで個人。",
    ],
    limits: [
      "研究やプロダクトとして体系化したものではなく、表現の引き出しを増やすための継続的な実験という位置づけ。",
    ],
    links: [
      { label: "作例（準備中）", href: "#" },
    ],
  },

  // ============================================================
  // 5. Taiji NP完全性証明（理論枠）
  // ============================================================
  {
    slug: "taiji-np-completeness",
    title: "パズルゲーム Taiji の NP完全性証明",
    tagline: "Circuit SAT からの帰着によるパズルの計算量解析",
    period: "学部（卒業研究）",
    role: "個人（卒業研究）",
    category: "theory",
    stack: ["計算量理論", "Circuit SAT", "NP完全性", "帰着"],
    cover: "/works/taiji-puzzle-example.png",
    featured: true,
    overview: [
      "明治大学情報科学科 離散アルゴリズム研究室での卒業研究として、パズルゲーム Taiji の中の数字を示す記号によって構成されるパズルが NP完全であることを Circuit SAT からの帰着により証明した。",
      "パズルの難しさを計算量理論の枠組みで形式的に示した研究である。",
    ],
    motivation: [
      "当時プレイしていたパズルゲーム Taiji を題材に、所属していた離散アルゴリズム研究室の専門（計算量理論）と、自分が面白いと感じる対象を掛け合わせた研究をしたいと考えたことが動機である。院試と並行する時期であったため、限られた期間で確実に成果を見込めるテーマを選んだという実際的な事情もあった。",
    ],
    system: [
      "Taiji の盤面要素を論理回路の構成素子に対応づけ、任意の Circuit SAT インスタンスを Taiji の問題例に多項式時間で変換できることを示した。",
    ],
    contribution: [
      "帰着の構成・証明まで個人。理論計算機科学から HCI へ専攻を移す前の出発点にあたる。",
    ],
    limits: [
      "理論的結果であり、実装やユーザー体験の評価を伴うものではない。",
    ],
    links: [
      {
        label: "卒業論文 (Google Drive)",
        href: "https://drive.google.com/drive/folders/1vt8lvscawutHDl057BS_VfjWirJVSNjW",
      },
    ],
    media: [
      {
        type: "image",
        src: "/works/taiji-puzzle-example.png",
        caption: "パズルゲーム Taiji の盤面例",
      },
    ],
  },

  // ============================================================
  // 以下、一覧にのみ掲載（詳細本文なし＝ featured: false）
  // 必要になったら featured: true にして本文を足す
  // ============================================================
  {
    slug: "software-engineering-pm",
    title: "Webアプリ開発（ソフトウェア工学演習・PM）",
    tagline: "PMとしてタスク管理・Git運用・発表までチームを主導",
    period: "学部",
    role: "チーム（PM）",
    category: "team",
    stack: ["HTML/CSS/JS", "Git", "チーム開発"],
    featured: false,
  },
  {
    slug: "server-admin",
    title: "サーバ管理（nginx / SSL）",
    tagline: "nginx・SSL構成の運用、Qualys SSL Labs A+ を達成",
    period: "学部",
    role: "個人（アルバイト）",
    category: "tool",
    stack: ["nginx", "SSL/TLS", "Linux", "サーバ運用"],
    featured: false,
  },
  {
    slug: "hackathons",
    title: "ハッカソン参加",
    tagline: "ワンキャリア主催ハッカソン等に参加",
    period: "—",
    role: "チーム",
    category: "team",
    stack: ["チーム開発"],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
