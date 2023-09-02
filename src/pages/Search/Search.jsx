import './Search.scss'
import { Header } from '../../components/Header/Header'
import { Listing } from '../../components/Listing/Listing'
import { useParams } from 'react-router-dom'
import { BurgerMenu } from '../../components/Menu/BurgerMenu'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function Search(){

    const {item} = useParams()
    const [listings, setListings] = useState(
        [
            {
                "title": "Zelda Breath of the Wild Switch",
                "price": "$40",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/362884081_6730559550341194_3036484111869270186_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=110&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=_3UgsAbVa6MAX-EDrV_&_nc_ht=scontent-lga3-1.xx&oh=00_AfDITWrv3R4lLaWd8f3fSxrZZiwKuqRvBr3-5sM2REFIJw&oe=64F76629",
                "link": "https://www.facebook.com/marketplace/item/770280214788120/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Brooklyn, NY"
            },
            {
                "title": "Switch Lite (Blue) + Hard Case + Zelda Tears of the Kingdom",
                "price": "$120",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/336152210_6157450451029903_6217395593573713498_n.jpg?stp=c26.0.260.260a_dst-jpg_p261x260&_nc_cat=105&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=AuGW-uFklCMAX-XAYbH&_nc_ht=scontent-lga3-2.xx&oh=00_AfDrN5tXHmpB_Q6HG4mXe_VygMnOviVVHs6spG57I3W2cA&oe=64F7B80D",
                "link": "https://www.facebook.com/marketplace/item/674568677852044/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "New York, NY"
            },
            {
                "title": "Legend of Zelda Breath of the Wild (Nintendo Switch)",
                "price": "$45",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/366084710_5903219309778398_7863147840853372655_n.jpg?stp=c43.0.260.260a_dst-jpg_p261x260&_nc_cat=105&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=B_UK57Cg3lwAX-Yvc6i&_nc_oc=AQlKNSNYoEFlvAVhEgo0GqrqFxpVfC5TB-154ha_yRxOIM-0QbqO1O95pW1v2DDrtuY&_nc_ht=scontent-lga3-2.xx&oh=00_AfBv1bchb3odDwHdddefN3S2PMqi4Y5MMdl6eUuKB9yhYg&oe=64F7E7C6",
                "link": "https://www.facebook.com/marketplace/item/1145936566363422/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "New York, NY"
            },
            {
                "title": "Zelda Tears of a Kingdom",
                "price": "$50",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/370349829_6906510552694507_7825475388734081031_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=109&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=5y5lgqGExtQAX_tKHKS&_nc_ht=scontent-lga3-2.xx&oh=00_AfBA6an9eHoRhibM02qh69BXFvzvjDk7aKi0J31s3h05yQ&oe=64F69891",
                "link": "https://www.facebook.com/marketplace/item/307903661905945/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "New York, NY"
            },
            {
                "title": "The Legend of Zelda: Tears of the Kingdom",
                "price": "$35",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/370469770_6317647008364900_1655602267957741673_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=100&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=Bw1uQhGaxIoAX85oEu5&_nc_ht=scontent-lga3-2.xx&oh=00_AfBUYOl0EB-1XXnle465kRhU3bqtJQISGPMph_CPt7AnpQ&oe=64F756D2",
                "link": "https://www.facebook.com/marketplace/item/259161847036110/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Hempstead, NY"
            },
            {
                "title": "The Legend Of Zelda Breath Of The Wild for Nintendo Switch",
                "price": "$40",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/370185247_9881380155236896_6069902723595299265_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=103&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=PUfdvqGI7e0AX9LGp2M&_nc_ht=scontent-lga3-1.xx&oh=00_AfBWb7cUhlGmB_P6d7m69b84Zj6IsP3HWubti1zQaQ6iTQ&oe=64F6C496",
                "link": "https://www.facebook.com/marketplace/item/192424923704155/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Middle Village, NY"
            },
            {
                "title": "Nintendo 3DS XL Console Legend of Zelda A Link Between Worlds Edition - Excellent Condition",
                "price": "$225",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/370310281_6564294553607440_5456246654522028538_n.jpg?stp=c0.0.261.261a_dst-jpg_p261x260&_nc_cat=105&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=2eIRlB75sB4AX-qIo7R&_nc_ht=scontent-lga3-2.xx&oh=00_AfASDhJPFtsQpGVj1CwvbL497dAhpUinX-fTkMCi-uO6Eg&oe=64F6F86C",
                "link": "https://www.facebook.com/marketplace/item/826537662159380/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Ships to you"
            },
            {
                "title": "Zelda Tears Of The Kingdom Switch",
                "price": "$300",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/367619298_6803047723068394_588994650022800384_n.jpg?stp=c0.39.261.261a_dst-jpg_p261x260&_nc_cat=106&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=AOONfxf_Z8sAX9LsEV8&_nc_ht=scontent-lga3-1.xx&oh=00_AfCfnbklHrVOwMMUDy31YEpWC0azWQ5v6s_N4r13evZK_w&oe=64F6ADF9",
                "link": "https://www.facebook.com/marketplace/item/1514052979334268/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Jersey City, NJ"
            },
            {
                "title": "Nintendo Switch OLED Zelda for Trade",
                "price": "Free",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/366754961_6477939498955777_57947030732424001_n.jpg?stp=c0.151.261.261a_dst-jpg_p261x260&_nc_cat=103&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=9m9wpD_xtpsAX9CTBFv&_nc_ht=scontent-lga3-1.xx&oh=00_AfCo2BQSsBWO9srDNb5ccYIk7FpSQpVt-0tc54_PKDqpUw&oe=64F739BD",
                "link": "https://www.facebook.com/marketplace/item/1211538832850004/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Maywood, NJ"
            },
            {
                "title": "Nintendo Switch Oled - The Legend of Zelda Tears of the Kingdom Edition **OFFERS**",
                "price": "Free",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/370152593_6560621540641159_5335344164616000064_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=104&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=JdvhjCf8dRIAX9mchUU&_nc_ht=scontent-lga3-2.xx&oh=00_AfDSHAGtXvjMCmxAtpTs4ydfolbkQ0Tya9RsF2tzGspG3A&oe=64F6B95D",
                "link": "https://www.facebook.com/marketplace/item/623074986564673/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Tenafly, NJ"
            },
            {
                "title": "Nintendo Switch Bundle",
                "price": "$185",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/363251560_6700270703363269_1212415688770107545_n.jpg?stp=c43.0.260.260a_dst-jpg_p261x260&_nc_cat=107&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=ljLRJcPmUMwAX8B5rUS&_nc_ht=scontent-lga3-2.xx&oh=00_AfBNtFT0qhfxRpacKEXuw3XP7vzADwaYWI8iZAGfI_O51g&oe=64F65A6B",
                "link": "https://www.facebook.com/marketplace/item/313603801143155/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Weehawken, NJ"
            },
            {
                "title": "N64",
                "price": "$80",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/367462300_6852030244816198_1346898764082778902_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=107&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=qqlFOFiDv-kAX_LY8B-&_nc_ht=scontent-lga3-2.xx&oh=00_AfAZpJDTemiMFvIOFDc054gjiii8kPJNa5u4cgOChOQBoA&oe=64F6E529",
                "link": "https://www.facebook.com/marketplace/item/248297801449735/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Ozone Park, NY"
            },
            {
                "title": "zelda breath of the wild",
                "price": "$50",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/358483421_6427207867369491_7411700797965761685_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=102&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=iMMWM-5Vd5oAX--7l45&_nc_ht=scontent-lga3-1.xx&oh=00_AfBHkf02tuTI9WRssghUskGuVvxt8MSKk2l7s0wTkVsYrw&oe=64F72BDB",
                "link": "https://www.facebook.com/marketplace/item/189294984132368/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "New York, NY"
            },
            {
                "title": "The Legend of Zelda Breath of the Wild on Nintendo Switch - Good Condition, Game Cartridge Only",
                "price": "$38",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/373752913_6535046203249098_7130207222514935370_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=111&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=BL6vV3DbUc0AX9MKE4E&_nc_ht=scontent-lga3-2.xx&oh=00_AfDe93D2Wp2TD10Q5May2LKzFT67TFUxu5-PbAh7QXQCJw&oe=64F7DA1B",
                "link": "https://www.facebook.com/marketplace/item/1384091085650492/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Ships to you"
            },
            {
                "title": "Nintendo 3DS - The Legend of Zelda Games",
                "price": "$80",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/371213442_6474485095932641_2733535892031033629_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=106&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=QDXn9gB3lA8AX-WE15_&_nc_ht=scontent-lga3-1.xx&oh=00_AfB7MGaxrbFBpM4Xhot6CgnjCnBHF1A6vWK1FhqeiaPsPg&oe=64F668A9",
                "link": "https://www.facebook.com/marketplace/item/627507639493236/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Brooklyn, NY"
            },
            {
                "title": "Zelda: breath of the wild",
                "price": "$45",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/354568490_6384704084941567_40057952379637646_n.jpg?stp=c0.101.261.261a_dst-jpg_p261x260&_nc_cat=108&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=78L2v4EDOIIAX_V2ItK&_nc_ht=scontent-lga3-1.xx&oh=00_AfBGvu50NvjaXI3Ehhc9dogRVetfxEu866plPj20ssGzsQ&oe=64F76E50",
                "link": "https://www.facebook.com/marketplace/item/984781282556656/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Bronx, NY"
            },
            {
                "title": "Legend of Zelda breath of the wild",
                "price": "$40",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/361670616_6914804651891684_8061257507624135662_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=107&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=bemQvD7uOQcAX-kBs3E&_nc_ht=scontent-lga3-2.xx&oh=00_AfDzBhub89Z_mD9_tclZyXHEHKGXusPf5MRmIxQxBhVIhw&oe=64F7D861",
                "link": "https://www.facebook.com/marketplace/item/1354792818717350/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Edison, NJ"
            },
            {
                "title": "Zelda books",
                "price": "$15",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/350999394_9309962775745510_473628392875610304_n.jpg?stp=c43.0.260.260a_dst-jpg_p261x260&_nc_cat=108&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=UqufZGuvVFgAX8VQdhQ&_nc_ht=scontent-lga3-1.xx&oh=00_AfCPNBzBkRBoyrdo-SFnjkTk__3VoW_FIO07k8wci6JNow&oe=64F74521",
                "link": "https://www.facebook.com/marketplace/item/2121754898030301/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "New York, NY"
            },
            {
                "title": "Nintendo DS lite Zelda edition",
                "price": "$90",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/365515122_6581408355252234_309721731953111701_n.jpg?stp=c0.151.261.261a_dst-jpg_p261x260&_nc_cat=106&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=xwGdNiGE9HoAX8GHax9&_nc_oc=AQnzbns_C7zZpmszukod7tbGpIfE_EDh4QMatF1KtC2mGxPa5GATGx_Y935bz3ebp2k&_nc_ht=scontent-lga3-1.xx&oh=00_AfAPMtQwtWyI7y7WgTbbmIYYPiNj62k9ZEr9dyk2vIxxZg&oe=64F6D981",
                "link": "https://www.facebook.com/marketplace/item/827326268738214/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "North Arlington, NJ"
            },
            {
                "title": "The Legend of Zelda Breath of the Wild Explorer's Guide",
                "price": "$30",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/337654787_6401781253262013_8913811939005473721_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=107&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=q6HaHBis6jUAX-kh1CU&_nc_ht=scontent-lga3-2.xx&oh=00_AfCKkOrRKccoG3kjO175ee0OzCpLLKtZckI_TABYKFsFZQ&oe=64F6AC39",
                "link": "https://www.facebook.com/marketplace/item/765996275319270/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "New York, NY"
            },
            {
                "title": "Legend of Zelda: Tears of the Kingdom",
                "price": "$50",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/369663402_6631305876918644_7624966946737810835_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=102&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=jrsm2P3N5bMAX-Vdljg&_nc_ht=scontent-lga3-1.xx&oh=00_AfDIFzpmfomZwzEXqJjCZPWp4BYs2nILmEs_Az-wemQPqg&oe=64F77FF8",
                "link": "https://www.facebook.com/marketplace/item/3700348806859690/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Brooklyn, NY"
            },
            {
                "title": "Zelda amiibo set of 40 cards botw Legend of Zelda, tears of the kingdom, CREDIT CARD SIZES",
                "price": "$18",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/358482265_6369643936424369_6115746298690040124_n.jpg?stp=c48.0.260.260a_dst-jpg_p261x260&_nc_cat=104&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=Ldm13SiP4MgAX9c7rcr&_nc_ht=scontent-lga3-2.xx&oh=00_AfBmEOqotuT6F0WMoSqmWJsQ_Rc5WyZ87T80JNqp-k1AJw&oe=64F71277",
                "link": "https://www.facebook.com/marketplace/item/3142351879401597/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Ships to you"
            },
            {
                "title": "zelda Nintendo switch remote",
                "price": "$35",
                "imageUrl": "https://scontent-lga3-1.xx.fbcdn.net/v/t45.5328-4/367407648_6997815153570054_39394034382688404_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=108&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=_BXAq4jVjk8AX-Nq0k-&_nc_ht=scontent-lga3-1.xx&oh=00_AfDywM_U5vDqmWyw9sCehxJrgkIgB54IVw64f1E7azWGRg&oe=64F703A5",
                "link": "https://www.facebook.com/marketplace/item/1826578804464177/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Brooklyn, NY"
            },
            {
                "title": "Zelda Breath of The Wild BOTW Set of 24 PVC NFC Amiibo Cards",
                "price": "$15",
                "imageUrl": "https://scontent-lga3-2.xx.fbcdn.net/v/t45.5328-4/360056838_6196018183842083_806117142266660492_n.jpg?stp=c43.0.260.260a_dst-jpg_p261x260&_nc_cat=109&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=ak5_XG_HFW8AX-D-SKe&_nc_ht=scontent-lga3-2.xx&oh=00_AfDSrdRrYvRL46wXPY5wydRnB0Da4ZdGsXWdg9vajRcQBg&oe=64F767C5",
                "link": "https://www.facebook.com/marketplace/item/1410915476157538/?ref=search&referral_code=null&referral_story_type=post&__tn__=!%3AD",
                "location": "Hoboken, NJ"
            },
            {
                "title": "For Gameboy Advance GB/GBA/NDSL The Legend of Zelda Series Game Cartridge USA",
                "price": "$13.99 to $59.99",
                "imageUrl": "https://i.ebayimg.com/thumbs/images/g/mbMAAOSwj0Nkmq5X/s-l300.webp",
                "link": "https://www.ebay.com/itm/305093615680?hash=item4708ff2040:g:mbMAAOSwj0Nkmq5X&amdata=enc%3AAQAIAAAA0Nk8jWTw1lecx2YoFGjzx7mycWML2Lar31AxGgwI7j67TsNRMuB2ZuFhSEBP0uaJKf6j0q9APir68FePhSNKVXEqvFNQUjOseZ4oUEykxrSkHgwJM7ALjqwlahpIUSTYiFioXzH0FFp2zJ16m2wyHG9wrwcgOqPqHmaYeb0BkPzNL9Iazmu5sNwdudlxvwr%2BdlAjqnujGygGPMlSrfCZllkjZ5475LjUJcBvifPQAIl2Pzjg%2FucyCH7BaBwYprlm%2Bga8Qn7pRh7DsG7BEdb8xvU%3D%7Ctkp%3ABFBM6IftoMpi"
            },
            {
                "title": "NEW LISTINGThe Legend of Zelda Skyward Sword NINTENDO WII NEW! Factory Sealed! WOW!",
                "price": "$39.99",
                "imageUrl": "https://i.ebayimg.com/thumbs/images/g/7LEAAOSw8CJk8e9s/s-l300.webp",
                "link": "https://www.ebay.com/itm/115904377871?epid=70915337&hash=item1afc70740f:g:7LEAAOSw8CJk8e9s&amdata=enc%3AAQAIAAAA4AiaELXuP0KoGgIhdnT3JSvScqJlNzuo5yRt0rKFKr%2B4O8qF9NwY6IDb7tOintR3iNzZ%2BEHwK6D8JIMANgGONpLm1frA8Ool535mkwTgjBa5R437ZNDJsmr3FShraLNuCR8hqmjqL1QCtjGTF7dlXZ1%2FAchSguJsWrk3vb8tW3vF4xIH2C7MTBXZ%2FOvexl9osmOvE11Iep7l4y%2FYMKgnb10TpXuQ6Z%2FlXGWs989GwvNKST4RmVAkseBn4suhc1wygx6bCULlK%2BpBMWoYfxfKyvZFHiWaMnHEbjgM4YF4Ouwl%7Ctkp%3ABFBM6IftoMpi"
            },
            {
                "title": "NEW LISTINGThe Legend of Zelda: Ocarina of Time - Master Quest (Nintendo GameCube) Complete",
                "price": "$55.00",
                "imageUrl": "https://i.ebayimg.com/thumbs/images/g/~LAAAOSw5Ghk8Vuw/s-l300.webp",
                "link": "https://www.ebay.com/itm/225754117706?epid=56236651&hash=item348ffe764a:g:~LAAAOSw5Ghk8Vuw&amdata=enc%3AAQAIAAAA0P9OJvgSs2e546StgywdXaHUqTVuRb0%2FaA9o28F%2F3x2EawQB%2FbnAARAGr2DIMU%2BL00Z9ycLubKZcbtw30n5cUsb%2FZn5u64XWUlMGbUowCh%2BT3FH5HcpB1eLGoB9sJIAX6SNA6uyW0B60dIUygCC244hX9AlqCXOEu16wcPix1wkFasmsQLmgbg75FGjdnMjt7fZEmCp1XyO9C%2F4m3fzMuuDjmVLcDYNaMDwiIzEtjqBjV7debFguPnDITt1pNasFSR1OxCJNoFrRiOUd8gojKT4%3D%7Ctkp%3ABFBM6IftoMpi"
            },
            {
                "title": "The Legend of Zelda: A Link Between Worlds - Nintendo 3DS",
                "price": "$24.99",
                "imageUrl": "https://i.ebayimg.com/thumbs/images/g/QGoAAOSwfvxiImdx/s-l300.webp",
                "link": "https://www.ebay.com/itm/285342719974?epid=5045282829&hash=item426fc05fe6:g:QGoAAOSwfvxiImdx&amdata=enc%3AAQAIAAAAwK9R6ZrvaYbAUWFvImUPiwI2f8OCEOBNiA7pGIviMwvJoNoP%2F8jT6w%2FRpfxcMQdEeOUzds6D2bCx8rw0H8EN7rdgPDXQUpf6IQsU3pSpxHf%2BHQuMWQz5RSYvX2h6fJMAt7mBCPdN4rUw4M0hqGuww4TecLvRicWP1xyQDaKN06t2t7KnVxmXYamwQ5aPBaJt0tgbn0j9dC67r5WCieKC1P1NiFX45aD3Wwk3jRZkWsKx7IQUSy9hAfJK9Z7VGsJSuA%3D%3D%7Ctkp%3ABk9SR-qH7aDKYg"
            },
            {
                "title": "Nintendo Gamecube Games Authentic, Cleaned & Tested Choose your favorite Zelda",
                "price": "$16.88 to $229.01",
                "imageUrl": "https://i.ebayimg.com/thumbs/images/g/UXkAAOSw4YBjQ6~m/s-l300.webp",
                "link": "https://www.ebay.com/itm/234728364074?hash=item36a6e6982a:g:UXkAAOSw4YBjQ6~m&amdata=enc%3AAQAIAAAA4LMKz7ui8HNslacbPtLK11J3Peb3GK3ZSVdlS3YRVzcCA4lZ%2FTV2YD7Zo6%2BiLCdVpP9Nw0d5Y%2BANyzJYEnzZ4F%2Ff%2BOj9PuRLswCRc0RNTbuvJB19K%2FZk4mUutCPxRFw%2FK48agQwrGZaoqOdudiBWtoyw%2BFv4XyPHC1aOxWo4k5JMb5f6F12VRB8ZsTVksScsMZAp2jie5iqFwpryU7zuHMvkcImKykYjn5kw7dv%2BjW1ShCRsD7qMzwwUvPwBFrM55CB00x0%2B0BtxH8mMwdHI7zyUjdr%2FVWbR%2B4flfZ%2F%2Fim2c%7Ctkp%3ABk9SR-qH7aDKYg"
            }       
        ]    
    )

    // const [listings, setListings] = useState([])


    // useEffect(() => {
    //     setListings([])
    //     let promises = []
    //     promises.push(
    //         axios(`http://localhost:2121/listings/facebook?search=${item}`),
    //         axios(`http://localhost:2121/listings/ebay?search=${item}`),
    //         axios(`http://localhost:2121/listings/craigslist?search=${item}`)
    //     )
    //     Promise.all(promises)
    //         .then((res) => {
    //             console.log(res)
    //             res.forEach(arr => {
    //                 setListings(prev => [...prev, ...arr.data])
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [item])

    // useEffect(() => {
    //     setListings([])
    //     let promises = []
    //     promises.push(
    //         axios(`http://localhost:2121/listings/facebook?search=${item}`),
    //         axios(`http://localhost:2121/listings/ebay?search=${item}`),
    //         axios(`http://localhost:2121/listings/craigslist?search=${item}`)
    //     )
    //     Promise.all(promises)
    //         .then((res) => {
    //             const facebookListings = res[0].data;
    //             const ebayListings = res[1].data;
    //             const craigslistListings = res[2].data;
    
    //             const maxLength = Math.max(facebookListings.length, ebayListings.length, craigslistListings.length);
    
    //             let mergedListings = [];
    
    //             for (let i = 0; i < maxLength; i++) {
    //                 if (i < facebookListings.length) {
    //                     mergedListings.push(facebookListings[i]);
    //                 }
    //                 if (i < ebayListings.length) {
    //                     mergedListings.push(ebayListings[i]);
    //                 }
    //                 if (i < craigslistListings.length) {
    //                     mergedListings.push(craigslistListings[i]);
    //                 }
    //             }
    
    //             setListings(mergedListings);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [item]);
    

    return (
        <main>
            <BurgerMenu />
            <Header item={item} />
            <div className="listings">
            {listings.map((listing, index) => {
                return (
                    <Listing 
                        key={index}
                        title={listing.title}
                        price={listing.price}
                        imageUrl={listing.imageUrl}
                        link={listing.link}
                        location={listing.location}
                    />
                )
            })}
            </div>
        </main>
    )
}