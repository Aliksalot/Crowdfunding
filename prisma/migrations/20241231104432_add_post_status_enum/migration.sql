-- CreateEnum
CREATE TYPE "Country" AS ENUM ('Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'AntiguaAndBarbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'BosniaAndHerzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'BurkinaFaso', 'Burundi', 'CaboVerde', 'Cambodia', 'Cameroon', 'Canada', 'CentralAfricanRepublic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'CostaRica', 'Croatia', 'Cuba', 'Cyprus', 'CzechRepublic', 'DemocraticRepublicOfTheCongo', 'Denmark', 'Djibouti', 'Dominica', 'DominicanRepublic', 'EastTimor', 'Ecuador', 'Egypt', 'ElSalvador', 'EquatorialGuinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'GuineaBissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'IvoryCoast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'KoreaNorth', 'KoreaSouth', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'MarshallIslands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'NewZealand', 'Nicaragua', 'Niger', 'Nigeria', 'NorthMacedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'PapuaNewGuinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'SaintKittsAndNevis', 'SaintLucia', 'SaintVincentAndTheGrenadines', 'Samoa', 'SanMarino', 'SaoTomeAndPrincipe', 'SaudiArabia', 'Senegal', 'Serbia', 'Seychelles', 'SierraLeone', 'Singapore', 'Slovakia', 'Slovenia', 'SolomonIslands', 'Somalia', 'SouthAfrica', 'SouthSudan', 'Spain', 'SriLanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'TrinidadAndTobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'UnitedArabEmirates', 'UnitedKingdom', 'UnitedStates', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'VaticanCity', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Art', 'FoodAndBeverages', 'Technology', 'Sports', 'Music', 'FilmAndVideo', 'Fashion', 'Design', 'HealthAndBeauty', 'VideoGames', 'Education', 'Travel', 'NatureAndEnvironment', 'ResearchAndScience', 'Pets', 'PersonalProjects', 'InteriorAndArchitecture', 'HomeImprovement', 'TransportationAndMobility', 'Photography', 'Books', 'SocialInitiatives', 'Cosmetics', 'RestaurantsAndCafes', 'WritingAndPublishing', 'SportsGoodsAndEquipment', 'AnimalsAndNature', 'HealthyEating', 'EventsAndFestivals', 'ChildcareServices', 'CarRepair', 'MedicalTechnology', 'FinanceAndInvestments', 'SustainableDevelopment', 'GamesAndToys');

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "location" "Country" NOT NULL DEFAULT 'Bulgaria',
    "category" "Category" NOT NULL DEFAULT 'Art',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "creator" TEXT NOT NULL,
    "raised" INTEGER NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);
