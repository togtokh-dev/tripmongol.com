import React, { FC, useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/outline";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import GuestsInput from "./GuestsInput";
import StartRating from "components/StartRating/StartRating";
import GoogleMapReact from "google-map-react";
import useWindowSize from "hooks/useWindowResize";
import moment from "moment";
import { DayPickerSingleDateController } from "react-dates";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonCircle from "shared/Button/ButtonCircle";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import ModalPhotos from "./ModalPhotos";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import ExperiencesDateSingleInput from "components/HeroSearchForm/ExperiencesDateSingleInput";
import Lang from "../../data/jsons/lang.json";
import AuthContext from "Context/AuthContext";
import axios from "../../axios";
export interface ListingExperiencesDetailPageProps {
  className?: string;
}

const PHOTOS: string[] = [
  "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "https://images.pexels.com/photos/1154638/pexels-photo-1154638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "https://images.pexels.com/photos/3851949/pexels-photo-3851949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2677398/pexels-photo-2677398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];
const data1 = {
  id: 1,
  name: "Турк Улсын 3 Хотын Аялал",
  name_en: "turk",
  href: "listing-experiences-detail",
  cat_id: "1",
  authorId: "1",
  date: null,
  listingCategoryId: "1",
  featuredImage: null,
  commentCount: null,
  viewCount: null,
  like: null,
  address: null,
  reviewStart: null,
  reviewCount: null,
  price: "$26",
  maxGuests: null,
  bedrooms: null,
  bathrooms: null,
  saleOff: null,
  isAds: null,
  tourcol: null,
  map: { lat: 55.2094559, lng: 61.5594641 },
  galleryImgs: [
    "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  ],
  author: {
    id: 1,
    firstName: "Буянтогтох",
    lastName: "Алтан-очир",
    displayName: "Developer",
    email: "me@togtokh.dev",
    gender: "Bigender",
    authorscol: null,
    avatar:
      "https://scontent.fuln8-1.fna.fbcdn.net/v/t1.6435-9/73482827_432973574269232_6959572191918686208_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=thwE92042pUAX_bpQZW&_nc_ht=scontent.fuln8-1.fna&oh=00_AT9KMMk1Dw3ZWnqmZ69VWk59De871tO6QYXl3NMl5yKtWA&oe=62BCE509",
    bgImage:
      "https://scontent.fuln8-1.fna.fbcdn.net/v/t1.6435-9/159095329_806581300241789_9102292864480646709_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=ITKvFjC3BmIAX8mz09I&_nc_oc=AQlvO7_9l4F4tPJimpKpjn9PVEH35ooocMT0DA6ZPFuWDa7kxDQ3B9Py2KE16dF1-Yg&tn=JGFYtEM8mlsNqXKp&_nc_ht=scontent.fuln8-1.fna&oh=00_AT_R-bWNZ_rHQJI8FXDHXU3-JlD4L0rGJRtiKMuWtJoBgQ&oe=62B967FC",
    count: 30,
    href: "/",
    desc: "developer test",
    jobName: "dev",
    authorscol1: "1",
  },
  about: "",
  listingCategory: {
    id: 1,
    href: "listing/1",
    name: "Энгийн багц аялал",
    name_en: "Simple package tour",
    thumbnail:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    count: 22,
    taxonomy: "category",
    stay: "listingType",
  },
};
const includes_demo = [
  { name: "Set Menu Lunch on boat" },
  { name: "Express Bus From Hanoi To Halong and Return" },
  { name: "Mineral Water On Express Bus" },
  { name: "Kayak or Bamboo Boat. Life Jacket." },
  { name: "Halong Bay Entrance Ticket" },
];
type QuizParams = {
  id: string;
};
const ListingExperiencesDetailPage: FC<ListingExperiencesDetailPageProps> = ({
  className = "",
}) => {
  const { id } = useParams<QuizParams>();
  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [guestAdults, setguestAdults] = useState<any | null>(1);
  const [guestChildren, setguestChildren] = useState<any | null>(0);
  const [guestInfants, setguestInfants] = useState<any | null>(0);
  let amount = [26, 10, 5];
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(
    moment().add(2, "days")
  );
  const [data, setData] = useState(data1);
  useEffect(() => {
    const fetchData = async () => {
      const api_ = await axios.get(`/tour_/${id}`);
      amount = [
        api_.data.data.amount_0,
        api_.data.data.amount_1,
        api_.data.data.amount_2,
      ];
      setData(api_.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  const windowSize = useWindowSize();

  const getDaySize = () => {
    if (windowSize.width <= 375) {
      return 34;
    }
    if (windowSize.width <= 500) {
      return undefined;
    }
    if (windowSize.width <= 1280) {
      return 56;
    }
    return 48;
  };

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const handleCloseModal = () => setIsOpen(false);

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge color="pink" name={auth.language.Specific_Tour} />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {data.name}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <StartRating />
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1"> {data.address}</span>
          </span>
        </div>
        {/* 4 */}
        <div className="flex items-center">
          <Avatar
            hasChecked
            imgUrl={data.author.avatar}
            sizeClass="h-10 w-10"
            radius="rounded-full"
          />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            {auth.language.Hosted_by}{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              {data.author.displayName}
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-clock text-2xl"></i>
            <span className="">{data.date}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-user-friends text-2xl"></i>
            <span className="">{data.maxGuests}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-language text-2xl"></i>
            <span className="">English, Mongolia</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">{auth.language.description}</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <p>{data.about}</p>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">{auth.language.Include} </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {auth.language.Included_in_the_price}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {includes_demo
            .filter((_, i) => i < 12)
            .map((item) => (
              <div key={item.name} className="flex items-center space-x-3">
                <i className="las la-check-circle text-2xl"></i>
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderSectionCheckIndate = () => {
    // return (
    //   <div className="listingSection__wrap overflow-hidden">
    //     {/* HEADING */}
    //     <div>
    //       <h2 className="text-2xl font-semibold">Availability</h2>
    //       <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
    //         Prices may increase on weekends or holidays
    //       </span>
    //     </div>
    //     <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
    //     {/* CONTENT */}
    //     <div className="listingSection__wrap__DayPickerRangeController flow-root">
    //       <div className="-mx-4 sm:mx-auto xl:mx-[-22px]">
    //         <DayPickerSingleDateController
    //           date={selectedDate}
    //           onDateChange={(date) => setSelectedDate(date)}
    //           onFocusChange={() => {}}
    //           focused
    //           initialVisibleMonth={null}
    //           numberOfMonths={windowSize.width < 1280 ? 1 : 2}
    //           daySize={getDaySize()}
    //           hideKeyboardShortcutsPanel
    //         />
    //       </div>
    //     </div>
    //   </div>
    // );
  };

  const renderSection5 = () => {
    // return (
    //   <div className="listingSection__wrap">
    //     {/* HEADING */}
    //     <h2 className="text-2xl font-semibold">Host Information</h2>
    //     <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
    //     {/* host */}
    //     <div className="flex items-center space-x-4">
    //       <Avatar
    //         hasChecked
    //         hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
    //         sizeClass="h-14 w-14"
    //         radius="rounded-full"
    //       />
    //       <div>
    //         <a className="block text-xl font-medium" href="##">
    //           Kevin Francis
    //         </a>
    //         <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
    //           <StartRating />
    //           <span className="mx-2">·</span>
    //           <span> 12 places</span>
    //         </div>
    //       </div>
    //     </div>
    //     {/* desc */}
    //     <span className="block text-neutral-6000 dark:text-neutral-300">
    //       Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
    //       accommodation, an outdoor swimming pool, a bar, a shared lounge, a
    //       garden and barbecue facilities...
    //     </span>
    //     {/* info */}
    //     <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
    //       <div className="flex items-center space-x-3">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-6 w-6"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={1.5}
    //             d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    //           />
    //         </svg>
    //         <span>Joined in March 2016</span>
    //       </div>
    //       <div className="flex items-center space-x-3">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-6 w-6"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={1.5}
    //             d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
    //           />
    //         </svg>
    //         <span>Response rate - 100%</span>
    //       </div>
    //       <div className="flex items-center space-x-3">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-6 w-6"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={1.5}
    //             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    //           />
    //         </svg>
    //         <span>Fast response - within a few hours</span>
    //       </div>
    //     </div>
    //     {/* == */}
    //     <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
    //     <div>
    //       <ButtonSecondary href="##">See host profile</ButtonSecondary>
    //     </div>
    //   </div>
    // );
  };

  const renderSection6 = () => {
    // return (
    //   <div className="listingSection__wrap">
    //     {/* HEADING */}
    //     <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
    //     <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
    //     {/* Content */}
    //     <div className="space-y-5">
    //       <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
    //       <div className="relative">
    //         <Input
    //           fontClass=""
    //           sizeClass="h-16 px-4 py-3"
    //           rounded="rounded-3xl"
    //           placeholder="Share your thoughts ..."
    //         />
    //         <ButtonCircle
    //           className="absolute right-2 top-1/2 transform -translate-y-1/2"
    //           size=" w-12 h-12 "
    //         >
    //           <ArrowRightIcon className="w-5 h-5" />
    //         </ButtonCircle>
    //       </div>
    //     </div>
    //     {/* comment */}
    //     <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
    //       <CommentListing className="py-8" />
    //       <CommentListing className="py-8" />
    //       <CommentListing className="py-8" />
    //       <CommentListing className="py-8" />
    //       <div className="pt-8">
    //         <ButtonSecondary>View more 20 reviews</ButtonSecondary>
    //       </div>
    //     </div>
    //   </div>
    // );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">{auth.language.location}</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {data.address}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
          <div className="rounded-xl overflow-hidden">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyDxJaU8bLdx7sSJ8fcRdhYS1pLk8Jdvnx0",
              }}
              defaultZoom={15}
              yesIWantToUseGoogleMapApiInternals
              defaultCenter={{
                lat: data.map.lat,
                lng: data.map.lng,
              }}
            >
              <LocationMarker lat={data.map.lat} lng={data.map.lng} />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    if (auth.lang == "mon") {
      return (
        <div className="listingSection__wrap">
          {/* HEADING */}
          <h2 className="text-2xl font-semibold">Мэдэх зүйлс</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

          {/* CONTENT */}
          <div>
            <h4 className="text-lg font-semibold">Цуцлах бодлого</h4>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              Аливаа туршлагыг худалдан авснаас хойш 24 цагийн дотор эсвэл
              туршлага эхлэхээс 7-оос доошгүй хоногийн өмнө цуцалж, төлбөрийг
              бүрэн буцаан олгох боломжтой.
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

          {/* CONTENT */}
          <div>
            <h4 className="text-lg font-semibold">Зочинд тавигдах шаардлага</h4>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              4 ба түүнээс дээш насны 10 хүртэлх зочид оролцох боломжтой. Мөн
              эцэг эхчүүд 2-оос доош насны хүүхдүүдийг авчирч болно.
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

          {/* CONTENT */}
          {/* <div>
            <h4 className="text-lg font-semibold">Юу авчрах вэ</h4>
            <div className="prose sm:prose">
              <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
                <li>
                  Formal Wear To Visit Bai Dinh Pagoda Be ready before 7.30 Am.
                </li>
                <li>We will pick up from 07.30 to 08.00 AM</li>
              </ul>
            </div>
          </div> */}
        </div>
      );
    } else {
      return (
        <div className="listingSection__wrap">
          {/* HEADING */}
          <h2 className="text-2xl font-semibold">Things to know</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

          {/* CONTENT */}
          <div>
            <h4 className="text-lg font-semibold">Cancellation policy</h4>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              Any experience can be canceled and fully refunded within 24 hours
              of purchase, or at least 7 days before the experience starts.
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

          {/* CONTENT */}
          <div>
            <h4 className="text-lg font-semibold">Guest requirements</h4>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              Up to 10 guests ages 4 and up can attend. Parents may also bring
              children under 2 years of age.
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

          {/* CONTENT */}
          {/* <div>
            <h4 className="text-lg font-semibold">What to bring</h4>
            <div className="prose sm:prose">
              <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
                <li>
                  Formal Wear To Visit Bai Dinh Pagoda Be ready before 7.30 Am.
                </li>
                <li>We will pick up from 07.30 to 08.00 AM</li>
              </ul>
            </div>
          </div> */}
        </div>
      );
    }
  };

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            {data.price}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /{auth.language.person}
            </span>
          </span>
          <StartRating />
        </div>

        {/* FORM */}
        <form className="flex flex-col sm:flex-row border divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-700 border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <div className="flex-1">
            <ExperiencesDateSingleInput
              defaultValue={selectedDate}
              anchorDirection={windowSize.width > 1400 ? "left" : "right"}
              fieldClassName="p-5"
              className="h-full"
            />
          </div>
          <div className="flex-1">
            <GuestsInput
              fieldClassName="p-5"
              onChange={(e) => {
                console.log(e);
                setguestAdults(e.guestAdults);
                setguestChildren(e.guestChildren);
                setguestInfants(e.guestInfants);
              }}
              defaultValue={{
                guestAdults: guestAdults,
                guestChildren: guestChildren,
                guestInfants: guestInfants,
              }}
            />
          </div>
        </form>

        {/* SUM */}
        <div className="flex flex-col space-y-4">
          {guestAdults >= 1 ? (
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>
                ${amount[0]} x {guestAdults} {auth.language.Adults}
              </span>
              <span>${amount[0] * guestAdults}</span>
            </div>
          ) : (
            ""
          )}
          {guestChildren >= 1 ? (
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>
                ${amount[1]} x {guestChildren} {auth.language.Children}
              </span>
              <span>${amount[1] * guestChildren}</span>
            </div>
          ) : (
            ""
          )}
          {guestInfants >= 1 ? (
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>
                ${amount[2]} x {guestInfants} {auth.language.Infants}
              </span>
              <span>${amount[2] * guestInfants}</span>
            </div>
          ) : (
            ""
          )}
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>{auth.language.Total}</span>
            <span>
              $
              {amount[0] * guestAdults +
                amount[1] * guestChildren +
                amount[2] * guestInfants}
            </span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary>Reserve</ButtonPrimary>
      </div>
    );
  };

  return (
    <div
      className={`nc-ListingExperiencesDetailPage  ${className}`}
      data-nc-id="ListingExperiencesDetailPage"
    >
      {/* SINGLE HEADER */}
      <>
        <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                src={data.galleryImgs[0]}
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {data.galleryImgs
              .filter((_, i) => i >= 1 && i < 4)
              .map((item, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 2 ? "block" : ""
                  }`}
                >
                  <NcImage
                    containerClassName="aspect-w-4 aspect-h-3"
                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                    src={item || ""}
                  />

                  {/* OVERLAY */}
                  <div
                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => handleOpenModal(index + 1)}
                  />
                </div>
              ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                {auth.language.Show_all_photos}
              </span>
            </div>
          </div>
        </header>
        {/* MODAL PHOTOS */}
        <ModalPhotos
          imgs={PHOTOS}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
          uniqueClassName="nc-ListingExperiencesDetailPage__modalPhotos"
        />
      </>

      {/* MAIn */}
      <main className="container relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSectionCheckIndate()}
          {renderSection5()}
          {renderSection6()}
          {renderSection7()}
          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className="block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-24">{renderSidebar()}</div>
        </div>
      </main>

      {/* STICKY FOOTER MOBILE */}
      <div className="block lg:hidden fixed bottom-0 inset-x-0 py-4 bg-white text-neutral-900 border-t border-neutral-200 z-20">
        <div className="container flex items-center justify-between">
          <span className="text-2xl font-semibold">
            {auth.language.Total}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              $
              {amount[0] * guestAdults +
                amount[1] * guestChildren +
                amount[2] * guestInfants}
            </span>
          </span>

          <ButtonPrimary href="##">Reserve</ButtonPrimary>
        </div>
      </div>

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingExperiencesDetailPage"
          />
        </div> */}

        {/* SECTION */}
        <SectionSubscribe2 className="pt-24 lg:pt-32" />
      </div>
    </div>
  );
};

export default ListingExperiencesDetailPage;
