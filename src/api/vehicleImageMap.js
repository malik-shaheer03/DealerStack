const VEHICLE_IMAGE_MAP = {
	'bmw m5 competition': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/2018_BMW_M5_Automatic_4.4.jpg/1920px-2018_BMW_M5_Automatic_4.4.jpg',
	'toyota crown platinum': 'https://cdn-fastly.autoguide.com/media/2024/03/28/10496/2024-toyota-crown-platinum-review-traditional-sedan-unusual-package.jpg?size=1224x1438&nocrop=1',
	'honda civic rs': 'https://blog.olx.com.pk/wp-content/uploads/2022/03/Honda-Civic-2022-1.jpg',
	'audi a5 sportback': 'https://uploads.audi-mediacenter.com/system/production/media/83906/images/8845e82f46c55fbb1de6a17ecfdbe33c53e553c8/A1911787_blog.jpg?1741863192',
	'lexus es 300h': 'https://di-uploads-pod23.dealerinspire.com/lexusofhenderson/uploads/2020/07/2020_Lexus_ES_300h_Exterior_01_83B3184A1DF4F8429DEBD52D8CD91AB5CB9726F2.jpg',
	'kia k5 gt-line': 'https://www.thedrive.com/wp-content/uploads/images-by-url-td/content/2020/07/kia_k5_gt_line.jpg?quality=85',
	'hyundai sonata n line': 'https://hyundai-nishat.com/wp-content/uploads/2025/01/Highlights-02-1120x600-min.webp',
	'nissan altima sr': 'https://media.ed.edmunds-media.com/nissan/altima/2026/oem/2026_nissan_altima_sedan_25-sr_fq_oem_1_1600.jpg',
	'mazda mazda3 turbo': 'https://cdn.motor1.com/images/mgl/kolWON/0:728:4107:3080/2024-mazda3-turbo-review.webp',
	'volkswagen passat r-line': 'https://uploads.vw-mms.de/system/production/images/vwn/029/209/images/c60380367069769698dab44f637f7302b2c3d76a/DB2019AU00850_web_1600.jpg?1649155009',
	'skoda superb laurin & klement': 'https://img.indianautosblog.com/2016/03/2016-Skoda-Superb-Laurin-Klement-front-three-quarter-darker-First-Drive-Review.jpg',
	'peugeot 508 gt': 'https://upload.wikimedia.org/wikipedia/commons/0/01/2019_Peugeot_508_GT-Line_BlueHDi_1.5_%28130_PS%29_Front.jpg',
	'tesla model 3 performance': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
	'genesis g70 sport prestige': 'https://hips.hearstapps.com/hmg-prod/images/2024-genesis-g70-awd-2p5t-sport-prestige-493-66ba237b7aae8.jpg?crop=0.601xw:0.506xh;0.163xw,0.403xh&resize=1200:*',
}

function normalizeToken(value) {
	return String(value ?? '')
		.toLowerCase()
		.replace(/\s+/g, ' ')
		.trim()
}

export function getVehicleMappedImage(make, model, year) {
	const normalizedMake = normalizeToken(make)
	const normalizedModel = normalizeToken(model)
	const key = `${normalizedMake} ${normalizedModel}`.trim()

	if (VEHICLE_IMAGE_MAP[key]) {
		return VEHICLE_IMAGE_MAP[key]
	}

	void year
	return ''
}
